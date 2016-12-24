(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [
             // Common 3rd Party Dependencies
            'uiGmapgoogle-maps',
            'textAngular',
            'xeditable',

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick Panel
            'app.quick-panel',

            // Sample
            'app.notes',
            // 'app.books',
            'app.invoice',
            'app.payment',
            'app.tenant',
            //Logistic
            // 'app.logistic',

            // Admin
            /*'app.admin',*/


            //Auth
            'app.auth',

            //Firebase
            'firebase'
        ]);
})();