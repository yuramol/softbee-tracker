'use strict';

/**
 * project router.
 */

import { factories } from '@strapi/strapi'; 

export default factories.createCoreRouter('api::project.project');

module.exports = {
    routes: [
      { // Path defined with an URL parameter
        method: 'GET',
        path: '/projects/pdf', 
        handler: 'project.generatePdf',
        config: {
            auth: false,
        },
      }
    ]
  }