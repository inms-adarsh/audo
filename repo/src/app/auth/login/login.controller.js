(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController(auth, $state, $firebaseObject, authService, $scope, $timeout)
    {
        var vm = this;
        // Data

        // Methods
        auth.$onAuthStateChanged(function (authData) {
          if (authData) {
            if(!authService.getCurrentTenant()) {
              var userData = rootRef.child('users').child(authData.uid);
              var obj = $firebaseObject(userData);
              obj.$loaded().then(function(data) {
                $timeout(function() {
                  $scope.userObj = data;
                  authService.setCurrentTenant($scope.userObj.tenantId);
                  $state.go('app.notes.threads');
                });
              });
            } else {
              $state.go('app.notes.threads');
            }
          }
        });
        //////////
        vm.login  = function (loginForm) {
             auth.$signInWithEmailAndPassword(vm.form.email, vm.form.password)
              .then(function (authData) {
                //vm.retrieveTenantId(authData)
              })
              .catch(function (error) {
               // showError(error);
                console.log("error: " + error);
              });
        }

        vm.retrieveTenantId = function(authData) {
            var tenantObj = rootRef.child('users').child(authData.uid);
            var obj = $firebaseObject(tenantObj);
            obj.$loaded().then(function(data) {
                authService.setCurrentUser(data.tenantId);
            });
        }
    }
})();