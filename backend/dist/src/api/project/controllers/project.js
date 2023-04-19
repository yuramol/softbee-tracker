'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *  project controller
 */
const strapi_1 = require("@strapi/strapi");
const date_fns_1 = require("date-fns");
const html_pdf_1 = __importDefault(require("html-pdf"));
const generate_html_reports_1 = require("../lib/generate-html-reports");
exports.default = strapi_1.factories.createCoreController('api::project.project', ({ strapi }) => ({
    async generatePdf(ctx) {
        try {
            // http://0.0.0.0:1337/api/report/pdf?userId=1&projectsIds=2&projectsIds=1&start=2022-09-01&end=2022-09-30
            let projectsIds;
            if (Array.isArray(ctx.query.projectsIds)) {
                projectsIds = ctx.query.projectsIds;
            }
            if (typeof ctx.query.projectsIds === 'string') {
                projectsIds = [ctx.query.projectsIds];
            }
            let usersIds;
            if (Array.isArray(ctx.query.usersIds)) {
                usersIds = ctx.query.usersIds;
            }
            if (typeof ctx.query.usersIds === 'string') {
                usersIds = [ctx.query.usersIds];
            }
            const start = typeof ctx.query.start === 'string' ? ctx.query.start : (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd');
            const end = typeof ctx.query.end === 'string' ? ctx.query.end : (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd');
            const users = await strapi.entityService.findMany('plugin::users-permissions.user', {
                filters: {
                    ...(usersIds ? {
                        id: usersIds
                    } : {}),
                },
            });
            const trackers = await strapi.entityService.findMany('api::tracker.tracker', {
                filters: {
                    ...(usersIds ? { user: {
                            id: usersIds
                        } } : {}),
                    ...(projectsIds ? { project: {
                            id: projectsIds
                        } } : {}),
                    date: {
                        $between: [(0, date_fns_1.format)((0, date_fns_1.startOfDay)((0, date_fns_1.parse)(start, 'yyyy-MM-dd', new Date())), 'yyyy-MM-dd HH:mm:ss'), (0, date_fns_1.format)((0, date_fns_1.endOfDay)((0, date_fns_1.parse)(end, 'yyyy-MM-dd', new Date())), 'yyyy-MM-dd HH:mm:ss')]
                    },
                    live: false,
                },
                populate: ['project', 'user'],
            });
            const trackersGroupDay = trackers.reduce((acc, tracker) => {
                var _a, _b, _c, _d;
                const trackerDate = (0, date_fns_1.parse)(tracker.date, 'yyyy-MM-dd', new Date());
                const trackerDuration = tracker.durationMinutes;
                const findTracker = acc.find(trackerGroupDay => (0, date_fns_1.isEqual)(trackerGroupDay.date, trackerDate));
                if (findTracker) {
                    findTracker.trackers.push({
                        description: tracker.description,
                        createdAt: (0, date_fns_1.parseISO)(tracker.createdAt),
                        projectName: tracker.project.name,
                        userName: `${(_a = tracker.user.firstName) !== null && _a !== void 0 ? _a : ''} ${(_b = tracker.user.lastName) !== null && _b !== void 0 ? _b : ''}`,
                        hoursMinutes: trackerDuration !== null && trackerDuration !== void 0 ? trackerDuration : 0,
                    });
                }
                else {
                    acc.push({
                        date: trackerDate,
                        trackers: [{
                                description: tracker.description,
                                createdAt: (0, date_fns_1.parseISO)(tracker.createdAt),
                                projectName: tracker.project.name,
                                userName: `${(_c = tracker.user.firstName) !== null && _c !== void 0 ? _c : ''} ${(_d = tracker.user.lastName) !== null && _d !== void 0 ? _d : ''}`,
                                hoursMinutes: trackerDuration !== null && trackerDuration !== void 0 ? trackerDuration : 0,
                            }]
                    });
                }
                return acc;
            }, []);
            const html = (0, generate_html_reports_1.generateHtmlReports)({
                usersFullName: users.map(user => { var _a, _b; return `${(_a = user.firstName) !== null && _a !== void 0 ? _a : ''} ${(_b = user.lastName) !== null && _b !== void 0 ? _b : ''}`; }),
                period: {
                    start: (0, date_fns_1.parse)(start, 'yyyy-MM-dd', new Date()),
                    end: (0, date_fns_1.parse)(end, 'yyyy-MM-dd', new Date())
                },
                trackersGroupDay: trackersGroupDay,
            });
            const pdf = new Promise((resolve, reject) => {
                html_pdf_1.default.create(html, {
                    format: 'A4',
                    childProcessOptions: {
                        env: {
                            OPENSSL_CONF: '/dev/null',
                        },
                    },
                    "border": "10px",
                }).toBuffer(function (err, buffer) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(buffer);
                    }
                });
            });
            setTimeout(() => { }, 300);
            const pdfBuffer = await pdf;
            ctx.body = pdfBuffer;
        }
        catch (err) {
            console.log(err);
            ctx.body = err;
        }
    },
}));
