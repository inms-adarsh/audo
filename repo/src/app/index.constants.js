(function ()
{
    'use strict';

    angular
        .module('fuse')
    .constant('loginRedirectPath', 'app.pages_auth_login')
    .constant('SIMPLE_LOGIN_PROVIDERS', ['password','facebook','google'])
    .factory('auth', ["$firebaseAuth", function ($firebaseAuth) {
      return $firebaseAuth();
    }]);;

})();
