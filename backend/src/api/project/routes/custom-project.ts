'use strict';

/**
 * project router.
 */

module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/report/pdf', 
        handler: 'project.generatePdf',
        config: {
            auth: false,
        },
      }
    ]
  }