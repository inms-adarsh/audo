(function ()
{
    'use strict';

    angular
        .module('app.notes',
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
            .state('app.notes', {
                abstract: true,
                url     : '/notes'
            })
            .state('app.notes.threads', {
                url      : '/{type:(?:label)}/:filter',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/notes/notes.html',
                        controller : 'NotesController as vm'
                    }
                },
                params   : {
                    type: {
                        value : null,
                        squash: true
                    }
                },
                 resolve : {
                    currentAuth: ["auth", function (auth) {
                        // returns a promisse so the resolve waits for it to complete
                        return auth.$requireSignIn();
                    }],
                    tenantInfo: function(auth, authService){
                        return authService.retrieveTenant();
                    },
                    settings: function(adminService) {
                        return adminService.getCurrentSettings();
                    }
                    
                },
                bodyClass: 'notes'
            }).state('app.notes.threads.thread', {
                url      : '/:threadId',
                bodyClass: 'notes'
            })
            .state('app.add_note', {
                url      : '/notes/add',
                bodyClass: 'notes',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/notes/addnote/addnote.html',
                        controller : 'AddnoteController as vm'
                    }
                },
                resolve  : {
                    Notes: function (msApi)
                    {
                        return msApi.resolve('admin.note@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/notes');

        // Api
        msApiProvider.register('mail.folders', ['app/data/mail/folders.json']);
        msApiProvider.register('mail.labels', ['app/data/mail/labels.json']);

        msApiProvider.register('mail.label.notes', ['app/data/mail/labels/notes.json']);
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
        // Navigation
        msNavigationServiceProvider.saveItem('audo', {
            title : 'SAMPLE',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('audo.notes', {
            title      : 'Audio Notes',
            icon       : 'icon-email',
            state      : 'app.notes.threads',
            stateParams: {
                filter: 'audio'
            },
        });
    }
})();