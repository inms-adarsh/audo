(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('notesService', notesService);

    /** @ngInject */
    function notesService($firebaseArray, $firebaseObject, auth, $q, $timeout, authService) {
        var currentUser;
        var service = {
            getTenantNotes: getTenantNotes,
            addNote: addNote,
            getNote: getNote,
            translateNote: translateNote,
            createTenantNotes: createTenantNotes
        };

        return service;

        //////////
        /**
         * Set Current User
         * @param {Object} User information object
         */
        function getTenantNotes(type) {
            var def = $q.defer(),
                ref = rootRef.child('tenant-translates').child(authService.getCurrentTenant()).child(type),
                obj = $firebaseArray(ref);

            obj.$loaded().then(function(data) {
                def.resolve(data);
            }).catch(function(err) {
                def.reject(err);
            });

            return def.promise;
        }

        /**
         * Get Current Settings
         * @param {String} Current Tenant Id
         */
        function addNote(note) {
            var tenantId = authService.getCurrentTenant(),
                ref = rootRef.child('tenant-notes').child(tenantId),
                notes = $firebaseArray(ref);
            note.user = auth.$getAuth().uid;
            notes.$add(note).then(function(ref) {
                return ref.key;
            }).then(function(key) {
                var updates = {};
                updates['/tenant-translates/' + tenantId + '/' + note.type + '/' + key] = note;
                updates['/tenant-note-contents/' + tenantId + '/' + key] = note;
                rootRef.update(updates, function() {

                });
                return key;
            }).catch(function(error) {
                console.error("Error: ", error);
            });
        }

        /**
         * Get Current Settings
         * @param {String} Current Tenant Id
         */
        function getNote() {
            var def = $q.defer(),
                ref = rootRef.child('settings'),
                obj = $firebaseObject(ref);

            obj.$loaded().then(function(data) {
                def.resolve(data);
            }).catch(function(err) {
                def.reject(err);
            });

            return def.promise;
        }

        /**
         * Get Current Settings
         * @param {String} Current Tenant Id
         */
        function translateNote() {
            var def = $q.defer(),
                ref = rootRef.child('settings'),
                obj = $firebaseObject(ref);

            obj.$loaded().then(function(data) {
                def.resolve(data);
            }).catch(function(err) {
                def.reject(err);
            });

            return def.promise;
        }

        /**
         * Create Tenant Notes
         */
        function createTenantNotes(tenantId) {
            var def = $q.defer(),
                ref = rootRef.child('tenant-notes').child(tenantId),
                obj = $firebaseArray(ref);

            obj.$loaded().then(function(data) {
                def.resolve(data);
            }).catch(function(err) {
                def.reject(err);
            });

            return def.promise;
        }
    }

})();