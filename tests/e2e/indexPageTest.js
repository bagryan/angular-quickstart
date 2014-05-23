describe('indexPageTest: ', function() {
    var ptor;

    beforeEach(function () {
        ptor = protractor.getInstance();
        ptor.get('e2e.html');
        ptor.waitForAngular();
    });


    it('display user\'s names', function() {
        expect(element(by.id('firstname')).getText()).toBe('Yuriy');
        expect(element(by.id('lastname')).getText()).toBe('Bagryanskiy');
    });

});