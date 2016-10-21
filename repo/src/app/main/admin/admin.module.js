(function ()
{
    'use strict';

    angular
        .module('app.admin',
            [
                // 3rd Party Dependencies
                'textAngular'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.admin', {
                abstract: true,
                url     : '/admin',
                resolve : {
                    Folders: function (msApi)
                    {
                        return msApi.resolve('mail.folders@get');
                    },
                    Labels : function (msApi)
                    {
                        return msApi.resolve('mail.labels@get');
                    },
                    currentAuth: ["auth", function (auth) {
                        // returns a promisse so the resolve waits for it to complete
                        return auth.$requireSignIn();
                    }]
                }
            })
            .state('app.admin.users', {
                url      : '/users',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/admin/users/users.html',
                        controller : 'UsersController as vm'
                    }
                },
                resolve  : {
                    Users: function (msApi)
                    {
                        return msApi.resolve('admin.users@get');
                    }
                },
                bodyClass: 'user'
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/admin');

        // Api
        msApiProvider.register('admin.users', ['app/data/admin/users.json']);
        // Navigation
        msNavigationServiceProvider.saveItem('admin', {
            title : 'Admin',
            group : true,
            weight: 1
        });

         msNavigationServiceProvider.saveItem('admin.user', {
            title      : 'Users',
            icon       : 'icon-email',
            state      : 'app.admin.users'
        });

        msNavigationServiceProvider.saveItem('admin.carrier', {
            title      : 'Carriers',
            icon       : 'icon-email',
            state      : 'app.add_note'
        });
    }
})();