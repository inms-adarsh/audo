(function ()
{
    'use strict';

    angular
        .module('app.logistic',
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
            .state('app.logistic', {
                abstract: true,
                url     : '/logistic',
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
            .state('app.logistic.threads', {
                url      : '/{type:(?:label)}/:filter',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/logistic/logistic.html',
                        controller : 'LogisticController as vm'
                    }
                },
                params   : {
                    type: {
                        value : null,
                        squash: true
                    }
                },
                bodyClass: 'logistic'
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/logistic');

 
        // Navigation
        msNavigationServiceProvider.saveItem('logistic', {
            title : 'Logistics',
            group : true,
            weight: 1
        });

         msNavigationServiceProvider.saveItem('logistic.booking', {
            title      : 'Booking',
            icon       : 'icon-email',
            state      : 'app.logistic.threads'
        });

        msNavigationServiceProvider.saveItem('logistic.dispatch', {
            title      : 'Dispatch',
            icon       : 'icon-email',
            state      : 'app.add_note'
        });

        msNavigationServiceProvider.saveItem('logistic.delivery', {
            title      : 'Delivery',
            icon       : 'icon-email',
            state      : 'app.add_note'
        });
    }
})();