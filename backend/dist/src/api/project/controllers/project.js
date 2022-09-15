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
const html_pdf_node_1 = __importDefault(require("html-pdf-node"));
const generate_html_reports_1 = require("../lib/generate-html-reports");
exports.default = strapi_1.factories.createCoreController('api::project.project', ({ strapi }) => ({
    async generatePdf(ctx) {
        try {
            // http://0.0.0.0:1337/api/report/pdf?userId=1&projectsId=2&projectsId=1&start=2022-09-01&end=2022-09-30
            const projectsId = Array.isArray(ctx.query.projectsId) ? ctx.query.projectsId : [];
            const userId = typeof ctx.query.userId === 'string' ? ctx.query.userId : '';
            const start = typeof ctx.query.start === 'string' ? ctx.query.start : (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd');
            const end = typeof ctx.query.end === 'string' ? ctx.query.end : (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd');
            const user = await strapi.entityService.findOne('plugin::users-permissions.user', userId, {});
            const trackers = await strapi.entityService.findMany('api::tracker.tracker', {
                filters: {
                    user: { id: userId },
                    project: { id: projectsId },
                    date: { $between: [start, end] },
                    live: false,
                },
                populate: ['project'],
            });
            const trackersGroupDay = trackers.reduce((acc, tracker) => {
                const trackerDate = (0, date_fns_1.parse)(tracker.date, 'yyyy-MM-dd', new Date());
                const trackerDuration = (0, date_fns_1.parse)(tracker.duration, 'yyyy-MM-dd', new Date());
                const findTracker = acc.find(trackerGroupDay => (0, date_fns_1.isEqual)(trackerGroupDay.date, trackerDate));
                if (findTracker) {
                    findTracker.trackers.push({
                        description: tracker.description,
                        projectName: tracker.project.name,
                        hoursMinutes: (0, date_fns_1.differenceInMinutes)((0, date_fns_1.startOfDay)(trackerDuration), trackerDuration),
                    });
                }
                else {
                    acc.push({
                        date: trackerDate,
                        trackers: [{
                                description: tracker.description,
                                projectName: tracker.project.name,
                                hoursMinutes: (0, date_fns_1.differenceInMinutes)((0, date_fns_1.startOfDay)(trackerDuration), trackerDuration),
                            }]
                    });
                }
                return acc;
            }, []);
            const html = (0, generate_html_reports_1.generateHtmlReports)({
                usersFullName: `${user.firstName} ${user.lastName}`,
                period: { start: (0, date_fns_1.parse)(start, 'yyyy-MM-dd', new Date()), end: (0, date_fns_1.parse)(end, 'yyyy-MM-dd', new Date()) },
                trackersGroupDay: trackersGroupDay,
            });
            const pdfBuffer = await html_pdf_node_1.default.generatePdf({ content: html }, { format: 'A4' });
            ctx.body = pdfBuffer;
        }
        catch (err) {
            console.log(err);
            ctx.body = err;
        }
    },
}));
