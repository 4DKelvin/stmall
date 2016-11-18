define(function (require) {
    var app = require('app'),
        image = require('components/image'),
        service = require('services/home.service');

    app.useModule('image'); //ng异步载入

    app.useModule('home.service'); //ng异步载入

    app.controller('home', ['$scope', 'homeService', function ($scope, homeService) {
        homeService.homePage(1).then(function (res) {
            $scope.images = [
                "http://lorempixel.com/g/800/500/city/1",
                "http://lorempixel.com/g/800/500/city/2",
                "http://lorempixel.com/g/800/500/city/3",
                "http://lorempixel.com/g/800/500/city/4",
                "http://lorempixel.com/g/800/500/city/5",
                "http://lorempixel.com/g/800/500/city/6",
                "http://lorempixel.com/g/800/500/city/7",
                "http://lorempixel.com/g/800/500/city/8"
            ];
        });
    }]);

});