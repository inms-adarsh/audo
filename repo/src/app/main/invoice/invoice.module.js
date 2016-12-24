(function ()
{
    'use strict';

    angular
        .module('app.invoice', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.invoice', {
            url      : '/bill',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/invoice/invoice.html',
                    controller : 'InvoiceController as vm', 
                    resolve : {
                        currentAuth: ["auth", function (auth) {
                            // returns a promisse so the resolve waits for it to complete
                            return auth.$requireSignIn();
                        }],
                        tenantInfo: function(auth, authService){
                            return authService.retrieveTenant();
                        },
                        settings: function(adminService) {
                            return adminService.getCurrentSettings();
                        }
                    }
                }
            },
            bodyClass: 'invoice'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/invoice');

    }

})();