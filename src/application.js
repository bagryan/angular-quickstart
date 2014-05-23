angular.module('app', [
        'bap.templates',
        'bap.controllers',
        'ngRoute',
        'ngAnimate',
        'cgBusy',
        'ui.bootstrap'
    ])
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/' , {
            templateUrl: 'templates/index.html',
            controller: 'indexController'
        });

    }])
;
