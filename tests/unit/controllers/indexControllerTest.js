describe('indexControllerTest: ', function() {
    var $scope, $httpBackend, user, createController;

    beforeEach(module('app.indexController', 'app.mocksData'));

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.whenGET('http://exampleapi.com/user/100500').respond(200, user);

        var $rootScope = $injector.get('$rootScope'),
            $controller = $injector.get('$controller');

        user = $injector.get('user');

        createController = function() {
            $scope = $rootScope.$new();
            return $controller('indexController', { "$scope" : $scope });
        };
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    it('has user object in the scope', function() {
        createController();
        expect($scope.user).toBeDefined();
    });

    it('inits user object from remote service', function() {
        $httpBackend.expectGET('http://exampleapi.com/user/100500');
        createController();
        $httpBackend.flush();

        expect($scope.user).toEqual(user);
    });

});
