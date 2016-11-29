define(function (require, exports, module) {
    var angular = require('angular'),
        $ = require('jquery');

    var ngModule = angular.module('search', []);

    document.createElement('search-bar');
    ngModule.directive('searchBar', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            template: '<div id="header">' +
            '<div class="mall-logo"><img src="images/mall_logo.png" alt=""></div>' +
            '<div class="mall-search">' +
            '<div class="ms-form">' +
            '<input type="text" class="ms-input">' +
            '<button class="ms-submit">搜索</button>' +
            '</div>' +
            '<ul class="ms-hot-query">' +
            '<li><a href="javascript:void(0);">iphone7</a></li>' +
            '<li><a href="javascript:void(0);">坚果</a></li>' +
            '<li><a href="javascript:void(0);">洗衣机</a></li>' +
            '<li><a href="javascript:void(0);">电视机</a></li>' +
            '<li><a href="javascript:void(0);">电脑</a></li>' +
            '<li><a href="javascript:void(0);">空调</a></li>' +
            '<li><a href="javascript:void(0);">冰箱</a></li>' +
            '<li><a href="javascript:void(0);">衣服</a></li>' +
            '<li><a href="javascript:void(0);">吹风机</a></li>' +
            '<li><a href="javascript:void(0);">鞋子</a></li>' +
            '<li><a href="javascript:void(0);">夹克</a></li>' +
            '<li><a href="javascript:void(0);">干衣机</a></li>' +
            '</ul>' +
            '</div>' +
            '</div>',
            scope: {
                'profile': '=?'
            },
            controller: function ($scope, $element, $attrs) {

            }
        }
    }]);

    module.exports = ngModule;
});