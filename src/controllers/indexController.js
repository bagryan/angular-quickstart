angular.module('app.indexController', [])
    .controller('indexController', ['$scope', '$http',
        function($scope, $http) {

            $scope.user = null;
            $http.get('http://exampleapi.com/user/100500').then(function (data) {
                $scope.user = data.data;
            });

        }]);