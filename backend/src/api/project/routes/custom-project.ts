'use strict';

/**
 * project router.
 */

export default {
    routes: [{
        method: 'GET',
        path: '/report/pdf',
        handler: 'project.generatePdf',
        config: {
            policies: [],
            middlewares: [],
        }
    }]
}
