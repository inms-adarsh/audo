(function ()
{
    'use strict';

    angular
        .module('app.books')
        .controller('BooksViewController', BooksViewController);

    /** @ngInject */
    function BooksViewController(BoardList)
    {
        var vm = this;

        // Data
        vm.boardList = BoardList.data;

        // Methods

        //////////
    }
})();