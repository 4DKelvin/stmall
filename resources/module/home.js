define(function (require) {
    var app = require('app');

    // dynamic load services here or add into dependencies of ui-router state config
    // require('../services/usersService');

    app.controller('home', ['$scope', function ($scope) {
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
        // shortcut to get angular injected service.
        //var userServices = app.get('usersService');
        //$scope.userList = usersService.list();
    }]);

});