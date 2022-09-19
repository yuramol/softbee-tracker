'use strict';

/**
 *  project controller
 */

import { factories } from '@strapi/strapi'; 
import { format, isEqual, parse, differenceInMinutes, startOfDay } from 'date-fns';
import htmlPdfNode from 'html-pdf-node';
import { generateHtmlReports, TTrackerGroup } from '../lib/generate-html-reports';

type TUser = {
  id: number,
  firstName: string,
  lastName: string,
}
type TTracker = {
  id: number,
  description: string,
  date: string,
  duration: string,
  project: {
    id: number,
    name: string,
  }
}

export default factories.createCoreController('api::project.project', ({strapi})=>({
    async generatePdf(ctx) {
        try {
          // http://0.0.0.0:1337/api/report/pdf?userId=1&projectsId=2&projectsId=1&start=2022-09-01&end=2022-09-30
          const projectsId = Array.isArray(ctx.query.projectsId) ? ctx.query.projectsId : [];
          const userId = typeof ctx.query.userId === 'string' ? ctx.query.userId : '';
          const start = typeof ctx.query.start === 'string' ? ctx.query.start : format(new Date(), 'yyyy-MM-dd');
          const end = typeof ctx.query.end === 'string' ? ctx.query.end : format(new Date(), 'yyyy-MM-dd');

          const user: TUser = await strapi.entityService.findOne('plugin::users-permissions.user', userId, {});
          const trackers: TTracker[] = await strapi.entityService.findMany('api::tracker.tracker', {
            filters: { 
              user: { id: userId },
              project: { id: projectsId },
              date: { $between: [start, end] },
              live: false,
             },
             populate: ['project'],
          });
          const trackersGroupDay = trackers.reduce((acc: TTrackerGroup[], tracker) => {
            const trackerDate = parse(tracker.date, 'yyyy-MM-dd', new Date());
            const trackerDuration = parse(tracker.duration, 'yyyy-MM-dd', new Date());
            const findTracker = acc.find(trackerGroupDay => isEqual(trackerGroupDay.date, trackerDate));
            if(findTracker){
              findTracker.trackers.push({
                description: tracker.description,
                projectName: tracker.project.name,
                hoursMinutes: differenceInMinutes(startOfDay(trackerDuration), trackerDuration),
              })
            }else{
              acc.push({
                date: trackerDate,
                trackers: [{
                  description: tracker.description,
                  projectName: tracker.project.name,
                  hoursMinutes: differenceInMinutes(startOfDay(trackerDuration), trackerDuration),
                }]
              })
            }
            return acc;
          }, [])
          
          const html = generateHtmlReports({
            usersFullName: `${user.firstName} ${user.lastName}`,
            period: {start: parse(start, 'yyyy-MM-dd', new Date()), end: parse(end, 'yyyy-MM-dd', new Date())},
            trackersGroupDay: trackersGroupDay,
          });

          const pdfBuffer = await htmlPdfNode.generatePdf({content:html}, { format: 'A4' });
          ctx.body = pdfBuffer;
        } catch (err) {
          console.log(err);
          
          ctx.body = err;
        }
      },
}));
