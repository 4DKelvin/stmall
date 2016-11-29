define(function (require, exports, module) {
    var angular = require('angular'),
        asyncLoader = require('angular-async-loader'),
        router = require('angular-ui-router'),
        dialog = require('ng-dialog');

    var app = angular.module('app', ['ui.router', 'ngDialog']);
    app.config(['$httpProvider', function ($httpProvider) {
        // Use raw Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/raw';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/raw';
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);

    app.run(['$rootScope', '$state', '$stateParams', '$dialog',
        function ($rootScope, $state, $stateParams, $dialog) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$dialog = $dialog;
        }
    ]);

    asyncLoader.configure(app);

    module.exports = app;
});