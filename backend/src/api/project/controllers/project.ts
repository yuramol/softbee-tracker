'use strict';

/**
 *  project controller
 */

import { factories } from '@strapi/strapi'; 

export default factories.createCoreController('api::project.project', ({strapi})=>({
    async generatePdf(ctx) {
        try {
            const projects = await strapi.service('api::project.project').find(ctx);
          ctx.body = 'ok';
        } catch (err) {
          ctx.body = err;
        }
      },
}));
