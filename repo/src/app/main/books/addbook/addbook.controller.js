(function ()
{
    'use strict';

    angular
        .module('app.books')
        .controller('AddbookController', AddbookController);

    /** @ngInject */
    function AddbookController($document, $state)
    {
        var vm = this;

        // Data
        vm.taToolbar = [
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote', 'bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent', 'html', 'insertImage', 'insertLink', 'insertVideo', 'wordcount', 'charcount']
        ];

        /**
         * Go to library page
         */
        function goToLibrary()
        {
            $state.go('app.library.books');
        }
    }
})();