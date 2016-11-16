define(function (require) {
    var app = require('app');

    // dynamic load services here or add into dependencies of ui-router state config
    // require('../services/usersService');

    app.controller('home', ['$scope', function ($scope) {
        $scope.name = 'Kelvin leung';
        // shortcut to get angular injected service.
        //var userServices = app.get('usersService');
        //$scope.userList = usersService.list();
    }]);

});