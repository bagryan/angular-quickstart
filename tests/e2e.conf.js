exports.config = {

    seleniumAddress: 'http://localhost:9515',

    specs: [
        'e2e/**/*Test.js'
    ],

    baseUrl: 'http://localhost/~bagryan/angular-quickstart/public/',

    capabilities: {
        browserName: 'phantomjs'
    }

};