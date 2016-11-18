define(function (require, exports, module) {
    var angular = require('angular');

    var module = angular.module('home.service', []);

    module.factory('homeService', ['$request', function ($request) {
        return {
            homePage: function (cityId) {
                return $request.get('home/homePage', {
                    cityId: cityId
                });
            }
        }
    }]);

    module.exports = module;
});