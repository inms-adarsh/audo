(function ()
{
    'use strict';

    angular
        .module('app.tenant', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.tenant', {
            url      : '/tenant',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/tenant/tenant.html',
                    controller : 'TenantController as vm', 
                    resolve : {
                        currentAuth: ["auth", function (auth) {
                            // returns a promisse so the resolve waits for it to complete
                            return auth.$requireSignIn();
                        }],
                        userInfo: function(authService, auth) {
                            return authService.getCurrentUser(auth.$getAuth().uid);
                        }
                    }
                }
            },
            bodyClass: 'tenant'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/tenant');

        // Navigation
        msNavigationServiceProvider.saveItem('admin', {
            title : 'Admin',
            group : true,
            weight: 1
        });
        msNavigationServiceProvider.saveItem('admin.tenant', {
            title : 'Profile',
            icon  : 'icon-account',
            state : 'app.tenant',
            weight: 5
        });
    }

})();