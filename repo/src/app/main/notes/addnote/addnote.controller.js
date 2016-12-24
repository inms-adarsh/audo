(function ()
{
    'use strict';

    angular
        .module('app.notes')
        .controller('AddnoteController', AddnoteController);

    /** @ngInject */
    function AddnoteController($document, $state, $firebaseArray, $firebaseObject, auth, $mdDialog, authService, notesService)
    {
        var vm = this;
        var tenantId = authService.getCurrentTenant();
        // Data
        vm.taToolbar = [
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote', 'bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent', 'html', 'insertImage', 'insertLink', 'insertVideo', 'wordcount', 'charcount']
        ];
        vm.categoriesSelectFilter = '';
        vm.ngFlowOptions = {
            // You can configure the ngFlow from here
            /*target                   : 'api/media/image',
             chunkSize                : 15 * 1024 * 1024,
             maxChunkRetries          : 1,
             simultaneousUploads      : 1,
             testChunks               : false,
             progressCallbacksInterval: 1000*/
        };
        vm.ngFlow = {
            // ng-flow will be injected into here through its directive
            flow: {}
        };
        vm.dropping = false;
        vm.saveNote = saveNote;
        vm.saveAsDraft = saveAsDraft;
        // Methods

        //////////

        init();

        /**
         * Initialize
         */
        function init()
        {
           
        }

        function saveAsDraft() {
          vm.note.type = 'drafts';
          vm.note.status = 'in-draft';
          notesService.addNote(vm.note);
        }

        function translate() {
          vm.note.type = 'audio';
          vm.note.status = 'in-translate';
          notesService.addNote(vm.note);
        }
        /**
         * Add Note
         */
        function saveNote() {

            var confirm = $mdDialog.confirm()
                .title('Are you sure?')
                .content('You cant change the content after translation.')
                .ariaLabel('Delete Task')
                .ok('Translate')
                .cancel('No Just save it!')
                .targetEvent(event);

            $mdDialog.show(confirm).then(function ()
            {
                translate();
            }, function ()
            {
                vm.saveAsDraft();
            });
          
        }
    }
})();