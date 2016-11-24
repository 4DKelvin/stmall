define(function (require, exports, module) {
    var angular = require('angular');

    var ngModule = angular.module('home.service', []);

    ngModule.factory('homeService', ['$request', function ($request) {
        return {
            homePage: function (cityId) {
                return $request.get('home/homePage', {
                    cityId: cityId
                });
            }
        }
    }]);

    module.exports = ngModule;
});

