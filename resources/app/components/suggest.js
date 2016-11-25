define(function (require, exports, module) {
    var angular = require('angular'),
        $ = require('jquery'),
        service = require('services/public.service');


    document.createElement('suggest');

    var ngModule = angular.module('suggest', ['public.service']);

    ngModule.directive('suggest', ['$timeout', 'publicService', function ($timeout, publicService) {
        return {
            restrict: 'E',
            template: '<div class="base-recommend" ng-if="!frame">' +
            '<h2 class="title">为你推荐</h2>' +
            '<ul class="br-main">' +
            '<li ng-repeat="product in list">' +
            '<div class="br-img">' +
            '<img ng-lazy="product.mainImage">' +
            '</div>' +
            '<div class="br-name ellipsis" ng-bind="product.title"></div>' +
            '<div class="price-sales">' +
            '<span class="price" ng-bind="\'￥\'+(product.shopPrice|number:2)"></span>' +
            '<span class="sales" ng-bind="product.soldnum"></span>' +
            '</div>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '<div class="my-recommend my-box" ng-if="frame">' +
            '<div class="mb-title">' +
            '<h2>为你推荐</h2>' +
            '</div>' +
            '<div class="mb-main paddingTB">' +
            '<div class="shop-product">' +
            '<ul class="p-list">' +
            '<li class="p-item" ng-repeat="product in list">' +
            '<div class="img-controller">' +
            '<a href="#"><img ng-lazy="product.mainImage"></a>' +
            '</div>' +
            '<div class="name" ng-bind="product.title"></div>' +
            '<div class="price">' +
            '<span class="market-price" ng-bind="\'￥\'+(product.shopPrice|number:2)"></span>' +
            '<span class="shop-price" ng-bind="\'￥\'+(product.marketPrice|number:2)"></span>' +
            '</div>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>',
            scope: {
                'size': '@',
                'frame': '@'
            },
            controller: function ($scope, $element, $attrs) {
                publicService.suggests().then(function (res) {
                    $scope.list = [];
                    res.data.forEach(function (item, index) {
                        if (index < $scope.size) {
                            $scope.list.push(item);
                        }
                    })
                });
            }
        }
    }]);

    module.exports = ngModule;
});