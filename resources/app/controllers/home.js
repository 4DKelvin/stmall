define(function (require) {
    var app = require('app'),
        image = require('components/image'),
        header = require('components/header'),
        search = require('components/search'),
        footer = require('components/footer'),
        product = require('services/product.service'),
        service = require('services/home.service');

    /** ng异步载入 */
    app.useModule(['image', 'header', 'search', 'footer', 'home.service', 'product.service']);
    app.controller('home', ['$scope', 'homeService', 'productService', '$cookie',
        function ($scope, homeService, productService, $cookie) {
            $scope.profile = $cookie('profile');
            productService.categories().then(function (res) {
                $scope.list = res?res.list:[];
            }, function (err) {

            })
        }]);

});