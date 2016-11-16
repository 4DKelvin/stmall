define(function (require, exports, module) {
    var angular = require('angular');
    var asyncLoader = require('angular-async-loader');

    require('angular-ui-router');

    var app = angular.module('app', ['ui.router']);

    // initialze app module for angular-async-loader
    asyncLoader.configure(app);

    module.exports = app;
});