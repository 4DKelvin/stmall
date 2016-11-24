define(function (require) {
    var app = require('app'),
        image = require('components/image'),
        header = require('components/header'),
        search = require('components/search'),
        footer = require('components/footer'),
        service = require('services/public.service'),
        crypto = require('services/crypto.service');

    /** ng异步载入 */
    app.useModule(['image', 'header', 'search', 'footer', 'public.service', 'crypto.service']);
    app.controller('login', ['$scope', 'publicService', '$state', '$cookie', 'AES',
        function ($scope, publicService, $state, $cookie, AES) {
            $scope.submit = function () {
                if ($scope.account && $scope.password) {
                    publicService.login($scope.account, AES.encrypt($scope.password)).then(function (res) {
                        $cookie('profile', res);
                        $state.go('home');
                    }, function (err) {

                    });
                }
            }
        }]);
});