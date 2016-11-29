define(function (require, exports, module) {
    var angular = require('angular'),
        $ = require('jquery'),
        service = require('services/member.service');


    document.createElement('favor');

    var ngModule = angular.module('favor', ['member.service']);

    ngModule.directive('favor', ['$timeout', 'memberService', function ($timeout, memberService) {
        return {
            restrict: 'E',
            template: '<div class="my-follow-shop my-box" ng-if="type==\'shop\'">' +
            '<div class="mb-title">' +
            '<h2>我关注的店铺</h2>' +
            '</div>' +
            '<div class="mb-main">' +
            '<div class="mb-item" ng-class="{\'borderB\':$index<list.length-1}" ng-repeat="item in list">' +
            '<div class="shop-info">' +
            '<div class="logo">' +
            '<img  ng-lazy="item.logo">' +
            '</div>' +
            '<div class="info">' +
            '<h2 ng-bind="item.shopName"></h2>' +
            '<a href="javascript:void(0);">进入店铺</a>' +
            '</div>' +
            '</div>' +
            '<div class="shop-product" ng-if="item.productList">' +
            '<ul class="p-list">' +
            '<li class="p-item" ng-repeat="product in item.productList">' +
            '<div class="img-controller">' +
            '<a href="javascript:void(0);"><img ng-lazy="product.mainImage"></a>' +
            '</div>' +
            '<div class="name" ng-bind="product.title"></div>' +
            '<div class="price">' +
            '<span class="market-price" ng-bind="\'¥\'+(product.marketPrice|number:\'2\')"></span>' +
            '<span class="shop-price" ng-bind="\'¥\'+(product.shopPrice|number:\'2\')"></span>' +
            '</div>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="my-collect-product my-box" ng-if="type==\'product\'">' +
            '<div class="mb-title">' +
            '<h2>我收藏的商品</h2>' +
            '</div>' +
            '<div class="mb-main paddingTB">' +
            '<div class="shop-product">' +
            '<ul class="p-list">' +
            '<li class="p-item" ng-repeat="item in list">' +
            '<div class="img-controller">' +
            '<a href="javascript:void(0);"><img ng-lazy="item.mainImage"></a>' +
            '</div>' +
            '<div class="name" ng-bind="item.title"></div>' +
            '<div class="price">' +
            '<span class="market-price" ng-bind="\'¥\'+(item.marketPrice|number:\'2\')"></span>' +
            '<span class="shop-price" ng-bind="\'¥\'+(item.shopPrice|number:\'2\')"></span>' +
            '</div>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>',
            scope: {
                'size': '@',
                'type': '@'
            },
            controller: function ($scope, $element, $attrs) {
                if ($scope.type == 'shop') {
                    //我的收藏店铺
                    memberService.favorShopList(0, $scope.size).then(function (res) {
                        $scope.list = res.list ? res.list : [];
                        $scope.list.forEach(function (item) {
                            memberService.shopProductList(item.shopId, false).then(function (res) {
                                item.productList = res.list;
                            }, function (err) {

                            });
                        });
                    }, function (err) {

                    });
                } else {
                    //我的收藏商品
                    memberService.favorProductList(0, $scope.size).then(function (res) {
                        $scope.list = res.list ? res.list : [];
                    }, function (err) {

                    });
                }
            }
        }
    }]);

    module.exports = ngModule;
});