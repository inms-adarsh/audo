(function ()
{
    'use strict';

    angular
        .module('app.auth', [
            'app.pages.auth.login',
            'app.pages.auth.register',
            'app.pages.auth.forgot-password',
            'app.pages.auth.reset-password'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        // msNavigationServiceProvider.saveItem('pages', {
        //     title : 'PAGES',
        //     group : true,
        //     weight: 2
        // });
    }
})();