'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * project router.
 */
exports.default = {
    routes: [{
            method: 'GET',
            path: '/report/pdf',
            handler: 'project.generatePdf',
            config: {
                policies: [],
                middlewares: [],
            }
        }]
};
