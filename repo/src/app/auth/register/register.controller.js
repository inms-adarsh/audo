(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.register')
        .controller('RegisterController', RegisterController);

    /** @ngInject */
    function RegisterController(auth, $state, $q)
    {
        var vm = this;
        // Data

        // Methods
        // auth.$onAuthStateChanged(function (authData) {
        //   if (authData) {
        //     $state.go('app.notes');
        //   }
        // });
        //////////
        vm.register  = function () {
             auth.$createUserWithEmailAndPassword(vm.form.email, vm.form.password)
            .then(function (authData) {
                vm.createProfile(authData);
                vm.redirect();
            })
            .catch(function (error) {
                console.error("Error: ", error);
            });
        };

        vm.createProfile = function(user) {
                      // var query =
          var userObj = rootRef.child('users').child(user.uid);
          var def = $q.defer();
          userObj.set({email: vm.form.email, name: vm.form.username}, function (err) {
            $timeout(function () {
              if (err) {
                def.reject(err);
              }
              else {
                def.resolve(userObj);
              }
            });
          });
          return def.promise;
        };

        vm.redirect = function() {
            $state.go('app.notes');
        };
    }
})();