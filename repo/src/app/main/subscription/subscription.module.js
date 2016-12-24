(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.subs', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.pages_auth_tenant', {
            url      : '/pages/auth/tenant',
            views    : {
                'main@'                                 : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.pages_auth_tenant': {
                    templateUrl: 'app/auth/tenant/tenant.html',
                    controller : 'TenantController as vm', 
                    resolve : {
                        currentAuth: ["auth", function (auth) {
                            // returns a promisse so the resolve waits for it to complete
                            return auth.$requireSignIn();
                        }]
                    }
                }
            },
            bodyClass: 'tenant'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/auth/tenant');

        // Navigation
        msNavigationServiceProvider.saveItem('pages.auth.tenant', {
            title : 'Tenant Information',
            state : 'app.pages_auth_tenant',
            weight: 5
        });
    }

})();