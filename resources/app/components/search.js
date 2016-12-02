define(function (require, exports, module) {
    var angular = require('angular'),
        $ = require('jquery');

    var ngModule = angular.module('search', []);

    document.createElement('search-bar');
    ngModule.directive('searchBar', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'E',
            template: '<div id="header">' +
            '<a class="mall-logo" ui-sref="home"><img src="images/mall_logo.png" alt=""></a>' +
            '<div class="mall-text" ng-bind="subTitle" ng-if="subTitle"></div>' +
            '<div class="mall-search">' +
            '<div class="ms-form">' +
            '<input type="text" placeholder="搜索宝贝" class="ms-input" ng-model="keyword">' +
            '<button class="ms-submit" ui-sref="product/productList({keyword:keyword,cate:0,page:1})">搜索</button>' +
            '</div>' +
            '<ul class="ms-hot-query" ng-if="!subTitle">' +
            '<li ng-repeat="text in hots"><a ui-sref="product/productList({keyword:text,cate:0,page:1})" ng-bind="text"></a></li>' +
            '</ul>' +
            '</div>' +
            '</div>',
            scope: {
                'subTitle': '@'
            },
            controller: function ($scope, $element, $attrs) {
                $scope.keyword = $rootScope.$stateParams.keyword;
                $scope.hots = ['iPhone 7', 'Mac book Pro 2016', 'iPad Mini'];
            }
        }
    }]);

    module.exports = ngModule;
});