define(function (require, exports, module) {
    var angular = require('angular'),
        asyncLoader = require('angular-async-loader'),
        cookies = require('angular-cookies'),
        router = require('angular-ui-router');

    var app = angular.module('app', ['ui.router', 'ngCookies']);

    asyncLoader.configure(app);

    app.run(function () {
        //TODO:初始化
    });


    module.exports = app;
});