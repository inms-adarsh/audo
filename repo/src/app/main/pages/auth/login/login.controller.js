(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController(auth, $state)
    {
        var vm = this;
        // Data

        // Methods
        auth.$onAuthStateChanged(function (authData) {
          if (authData) {
            $state.go('app.dashboards_analytics');
          }
        });
        //////////
        vm.login  = function (loginForm) {
             auth.$signInWithEmailAndPassword(vm.form.email, vm.form.password)
              .then(function (authData) {
                $state.go('app.dashboards_analytics');
                console.log("logged");
              })
              .catch(function (error) {
                showError(error);
                console.log("error: " + error);
              });
        }
    }
})();