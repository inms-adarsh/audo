(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.reset-password', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.pages_auth_reset-password', {
            url      : '/pages/auth/reset-password',
            views    : {
                'main@'                                : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.pages_auth_reset-password': {
                    templateUrl: 'app/auth/reset-password/reset-password.html',
                    controller : 'ResetPasswordController as vm',
                    resolve : {
                        currentAuth: ["auth", function (auth) {
                            // returns a promisse so the resolve waits for it to complete
                            return auth.$requireSignIn();
                        }]
                        
                    }
                }
            },
            bodyClass: 'reset-password'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/auth/reset-password');

        // Navigation
    }

})();