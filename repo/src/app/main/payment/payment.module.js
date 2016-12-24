(function ()
{
    'use strict';

    angular
        .module('app.payment', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.word_credit', {
            url      : '/payment',
            views    : {
               
                'content@app': {
                    templateUrl: 'app/main/payment/payment.html',
                    controller : 'PaymentController as vm', 
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
            bodyClass: 'paymment'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/payment');

        // Navigation
        msNavigationServiceProvider.saveItem('admin.payment', {
            title : 'Buy word credit',
            state : 'app.word_credit',
            icon  : 'icon-store',
            weight: 5
        });

        msNavigationServiceProvider.saveItem('admin.history', {
            title : 'Payment History',
            state : 'app.payment.history',
            icon  : 'icon-payment',
            weight: 5
        });
    }

})();