define(function (require) {
    var app = require('app'),
        $ = require('jquery'),
        image = require('components/image'),
        header = require('components/header'),
        search = require('components/search'),
        footer = require('components/footer'),
        service = require('services/public.service'),
        crypto = require('services/crypto.service');

    /** ng异步载入 */
    app.useModule(['public.service', 'crypto.service']);
    app.controller('login', ['$scope', 'publicService', '$state', '$cookie', 'AES',
        function ($scope, publicService, $state, $cookie, AES) {
            $scope.submit = function () {
                if ($scope.account && $scope.password) {
                    publicService.login($scope.account, AES.encrypt($scope.password)).then(function (res) {
                        $cookie('profile', res);
                        return publicService.information(res.memberId)
                    }, function (err) {
                        //登录失败
                    }).then(function (res) {
                        $cookie('profile', $.extend($cookie('profile'), res));
                        $state.go('home');
                    }, function (err) {
                        //获取用户信息失败
                    });
                }
            }
        }]);
});