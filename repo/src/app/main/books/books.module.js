(function ()
{
    'use strict';

    angular
        .module('app.books',
            [
                // 3rd Party Dependencies
                'datatables',
                'flow',
                'nvd3',
                'textAngular',
                'uiGmapgoogle-maps',
                'xeditable'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.library', {
                abstract : true,
                url      : '/library',
                resolve  : {
                    BoardList: function (msApi)
                    {
                        return msApi.resolve('scrumboard.boardList@get');
                    }
                },
                bodyClass: 'library'
            })

            // Home
            .state('app.library.books', {
                url  : '/books',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/books/books.html',
                        controller : 'BooksViewController as vm'
                    }
                }
            })
            .state('app.library.books.book', {
                url      : '/:id',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/books/views/book.html',
                        controller : 'BookController as vm'
                    }
                },
                params   : {
                    type: {
                        value : null,
                        squash: true
                    }
                },
                 resolve : {
                    Folders: function (msApi)
                    {
                        return msApi.resolve('mail.folders@get');
                    },
                    Labels : function (msApi)
                    {
                        return msApi.resolve('mail.labels@get');
                    },
                    currentAuth: ["auth", function (auth) {
                        // returns a promisse so the resolve waits for it to complete
                        return auth.$requireSignIn();
                    }]
                },
                bodyClass: 'books'
            })
            .state('app.library.books.threads.thread', {
                url      : '/:threadId',
                bodyClass: 'books'
            }).state('app.library.books.add_book', {
                url      : '/books/add',
                bodyClass: 'books',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/books/addbook/addbook.html',
                        controller : 'AddbookController as vm'
                    }
                },
                resolve  : {
                    books: function (msApi)
                    {
                        return msApi.resolve('admin.note@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/books');

        // Api
        msApiProvider.register('mail.folders', ['app/data/mail/folders.json']);
        msApiProvider.register('mail.labels', ['app/data/mail/labels.json']);

        msApiProvider.register('mail.label.books', ['app/data/mail/labels/books.json']);
        msApiProvider.register('mail.label.paypal', ['app/data/mail/labels/paypal.json']);
        msApiProvider.register('mail.label.invoices', ['app/data/mail/labels/invoices.json']);
        msApiProvider.register('mail.label.amazon', ['app/data/mail/labels/amazon.json']);

        msApiProvider.register('mail.folder.inbox', ['app/data/mail/folders/inbox.json']);
        msApiProvider.register('mail.folder.sent', ['app/data/mail/folders/sent.json']);
        msApiProvider.register('mail.folder.drafts', ['app/data/mail/folders/drafts.json']);
        msApiProvider.register('mail.folder.spam', ['app/data/mail/folders/spam.json']);
        msApiProvider.register('mail.folder.trash', ['app/data/mail/folders/trash.json']);
        msApiProvider.register('mail.folder.starred', ['app/data/mail/folders/starred.json']);
        msApiProvider.register('mail.folder.important', ['app/data/mail/folders/important.json']);
        msApiProvider.register('admin.note', ['app/data/admin/product.json']);

        msApiProvider.register('scrumboard.boardList', ['app/data/scrumboard/board-list.json']);
        msApiProvider.register('scrumboard.board', ['app/data/scrumboard/boards/:id.json']);

        // Navigation

         msNavigationServiceProvider.saveItem('audo.books', {
            title      : 'Books',
            icon       : 'icon-email',
            state      : 'app.library.books',
            stateParams: {
                filter: 'inbox'
            },
        });
    }
})();