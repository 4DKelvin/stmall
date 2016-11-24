define(function (require, exports, module) {
    var angular = require('angular'),
        asyncLoader = require('angular-async-loader'),
        router = require('angular-ui-router');

    var app = angular.module('app', ['ui.router']);
    app.config(['$httpProvider', function ($httpProvider) {
        // Use raw Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/raw';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/raw';
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);

    app.run(['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]);

    asyncLoader.configure(app);

    module.exports = app;
});