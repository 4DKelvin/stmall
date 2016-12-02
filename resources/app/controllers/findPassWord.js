define(function (require) {
    var app = require('app'),
        geetest = require('geetest');
    app.controller('findPassWord', ['$scope', function ($scope) {
        $scope.isCheckUser = true;
        $scope.step = 'check';
        $scope.result='success';
    }]);
});
