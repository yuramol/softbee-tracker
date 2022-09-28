'use strict';

/**
 *  project controller
 */

import {
    factories
} from '@strapi/strapi';
import {
    format,
    isEqual,
    parse,
    startOfDay,
    endOfDay,
    parseISO
} from 'date-fns';
import htmlPdfNode from 'html-pdf';
import {
    generateHtmlReports,
    TTrackerGroup
} from '../lib/generate-html-reports';

type TUser = {
    id: number,
    firstName: string,
    lastName: string,
}
type TTracker = {
    id: number,
    description: string,
    date: string,
    durationMinutes: number,
    createdAt: string,
    project: {
        id: number,
        name: string,
    },
    user: {
        id: number,
        firstName: string,
        lastName: string,
    }
}

export default factories.createCoreController('api::project.project', ({
    strapi
}) => ({
    async generatePdf(ctx) {
        try {
            // http://0.0.0.0:1337/api/report/pdf?userId=1&projectsIds=2&projectsIds=1&start=2022-09-01&end=2022-09-30
            let projectsIds: string[]|undefined;
            if(Array.isArray(ctx.query.projectsIds)){
                projectsIds = ctx.query.projectsIds;
            }if (typeof ctx.query.projectsIds === 'string') {
                projectsIds = [ctx.query.projectsIds]
            }
            let usersIds: string[]|undefined;
            if(Array.isArray(ctx.query.usersIds)){
                usersIds = ctx.query.usersIds;
            }if (typeof ctx.query.usersIds === 'string') {
                usersIds = [ctx.query.usersIds]
            }

            const start = typeof ctx.query.start === 'string' ? ctx.query.start : format(new Date(), 'yyyy-MM-dd');
            const end = typeof ctx.query.end === 'string' ? ctx.query.end : format(new Date(), 'yyyy-MM-dd');

            const users: TUser[] = await strapi.entityService.findMany('plugin::users-permissions.user', {
                filters: {
                    ...(usersIds ? {user: {
                        id: usersIds
                    }} : {}),
                },
            });
            const trackers: TTracker[] = await strapi.entityService.findMany('api::tracker.tracker', {
                filters: {
                    ...(usersIds ? {user: {
                        id: usersIds
                    }} : {}),
                    ...(projectsIds ? {project: {
                        id: projectsIds
                    }} : {}),
                    date: {
                        $between: [format(startOfDay(parse(start, 'yyyy-MM-dd', new Date())), 'yyyy-MM-dd HH:mm:ss'), format(endOfDay(parse(end, 'yyyy-MM-dd', new Date())), 'yyyy-MM-dd HH:mm:ss')]
                    },
                    live: false,
                },
                populate: ['project', 'user'],
            });
            const trackersGroupDay = trackers.reduce((acc: TTrackerGroup[], tracker) => {
                const trackerDate = parse(tracker.date, 'yyyy-MM-dd', new Date());
                const trackerDuration = tracker.durationMinutes;
                const findTracker = acc.find(trackerGroupDay => isEqual(trackerGroupDay.date, trackerDate));
                if (findTracker) {
                    findTracker.trackers.push({
                        description: tracker.description,
                        createdAt: parseISO(tracker.createdAt),
                        projectName: tracker.project.name,
                        userName: `${tracker.user.firstName ?? ''} ${tracker.user.lastName ?? ''}`,
                        hoursMinutes: trackerDuration ?? 0,
                    })
                } else {
                    acc.push({
                        date: trackerDate,
                        trackers: [{
                            description: tracker.description,
                            createdAt: parseISO(tracker.createdAt),
                            projectName: tracker.project.name,
                            userName: `${tracker.user.firstName ?? ''} ${tracker.user.lastName ?? ''}`,
                            hoursMinutes: trackerDuration ?? 0,
                        }]
                    })
                }
                return acc;
            }, [])

            const html = generateHtmlReports({
                usersFullName: users.map(user => `${user.firstName ?? ''} ${user.lastName ?? ''}`),
                period: {
                    start: parse(start, 'yyyy-MM-dd', new Date()),
                    end: parse(end, 'yyyy-MM-dd', new Date())
                },
                trackersGroupDay: trackersGroupDay,
            });

            const pdf = new Promise((resolve, reject) => {
                htmlPdfNode.create(html, {
                    format: 'A4',
                    childProcessOptions: {
                        env: {
                            OPENSSL_CONF: '/dev/null',
                        },
                    },
                    "border": "10px",
                }).toBuffer(function(err, buffer) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(buffer);
                    }
                })
            });
            const pdfBuffer = await pdf;
            ctx.body = pdfBuffer;
        } catch (err) {
            console.log(err);
            ctx.body = err;
        }
    },
}));
