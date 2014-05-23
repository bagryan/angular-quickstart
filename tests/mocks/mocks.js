angular.module('app.mocks', ['ngMockE2E', 'app.mocksData'])
    .run(['$httpBackend', 'user',
    function($httpBackend, user) {

        $httpBackend.whenGET('http://exampleapi.com/user/100500').respond(200, user);

    }]);

angular.module('app').requires.push('app.mocks');
