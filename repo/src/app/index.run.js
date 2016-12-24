(function ()
{
    'use strict';

    angular
        .module('fuse')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, $timeout, $state, editableThemes, auth, $firebaseObject, authService)
    {
        // 3rd Party Dependencies
        editableThemes.default.submitTpl = '<md-button class="md-icon-button" type="submit" aria-label="save"><md-icon md-font-icon="icon-checkbox-marked-circle" class="md-accent-fg md-hue-1"></md-icon></md-button>';
        editableThemes.default.cancelTpl = '<md-button class="md-icon-button" ng-click="$form.$cancel()" aria-label="cancel"><md-icon md-font-icon="icon-close-circle" class="icon-cancel"></md-icon></md-button>';

        // Activate loading indicator
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function ()
        {
            $rootScope.loadingProgress = true;
        });

        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function ()
        {
            $timeout(function ()
            {
                $rootScope.loadingProgress = false;
            });
        });

        // Store state in the root scope for easy access
        $rootScope.state = $state;

        // auth.$onAuthStateChanged(function(data) {
        //     if(data && !authService.getCurrentUser()) {
        //         var userData = rootRef.child('users').child(data.uid);
        //         var obj = $firebaseObject(userData);
        //         obj.$loaded().then(function(user){
        //             $timeout(function(){
        //                 $rootScope.user = user;
        //                 authService.setCurrentUser($rootScope.user.tenantId);
        //             });
        //         });
        //     }
        // });
        // Cleanup
        $rootScope.$on('$destroy', function ()
        {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        });
    }
})();