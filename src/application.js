angular.module('app', [
        'app.templates',
        'app.controllers',
        'ngRoute',
        'ngAnimate',
        'cgBusy',
        'ui.bootstrap'
    ])
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/' , {
            templateUrl: 'src/templates/index.html',
            controller: 'indexController'
        });

    }])
;
