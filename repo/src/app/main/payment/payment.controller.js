(function ()
{
    'use strict';

    angular
        .module('app.payment')
        .controller('PaymentController', PaymentController);

    /** @ngInject */
    function PaymentController(currentAuth, authService, settings, tenantInfo, $scope, paymentService, $state)
    {
        var vm = this;
        vm.payment = [];
        vm.settings = settings;
        vm.tenantInfo = tenantInfo;
        vm.payment.count = 0;
        
        /*
            Calculate Payment
         */
        $scope.$watch(angular.bind(vm, function () { 
            return vm.payment.count;
        }), function(value) {
            var total = value * vm.settings.cost;
            vm.payment.cost = isNaN(total) ? 0 : total;
        });

        vm.payment.cost = vm.payment.count * vm.settings.cost;
        // Data
        var handler = StripeCheckout.configure({
          key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
          image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
          locale: 'auto',
          allowRememberMe: false,
          token: function(token) {
            var payObject = {
                amount: vm.payment.cost,
                currency: 'usd',
                words: vm.payment.count,
                cost: vm.settings.cost
            };
            paymentService.setCurrentToken(token, payObject).then(function(){
                vm.redirect();
            });
          }
        });

        // Methods
        vm.pay = pay;
        vm.redirect = redirect;

        /**
         * Buy Words(Opens stripe checkout form)
         */
        function pay() {
            handler.open({
                name: 'Stripe.com',
                description: '2 widgets',
                zipCode: true,
                amount: vm.payment.cost*100
            });
        }

        /**
         * Redirect to invoice page
         */
        function redirect() {
            $state.go('app.pages_auth_invoice');
        }
    }
})();