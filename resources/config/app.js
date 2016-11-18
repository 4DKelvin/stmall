define(function (require, exports, module) {
    var angular = require('angular'),
        asyncLoader = require('angular-async-loader'),
        router = require('angular-ui-router');

    var app = angular.module('app', ['ui.router']);


    app.run(function () {
        //TODO:初始化
    });

    asyncLoader.configure(app);

    module.exports = app;
});