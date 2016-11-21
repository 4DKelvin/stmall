define(function (require, exports, module) {
    var angular = require('angular'),
        asyncLoader = require('angular-async-loader'),
        router = require('angular-ui-router');

    var app = angular.module('app', ['ui.router']);


    app.run(['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]);

    asyncLoader.configure(app);

    module.exports = app;
});