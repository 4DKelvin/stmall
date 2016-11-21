define(function (require, exports, module) {
    var angular = require('angular'),
        $ = require('jquery');

    var module = angular.module('search', []);

    document.createElement('search-bar');
    module.directive('searchBar', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            template: '<div id="header">' +
            '<div class="mall-logo"></div>' +
            '<div class="mall-search">' +
            '<div class="ms-form">' +
            '<input type="text" class="ms-input">' +
            '<button class="ms-submit">搜索</button>' +
            '</div>' +
            '<ul class="ms-hot-query">' +
            '<li><a href="#">iphone7</a></li>' +
            '<li><a href="#">坚果</a></li>' +
            '<li><a href="#">洗衣机</a></li>' +
            '<li><a href="#">电视机</a></li>' +
            '<li><a href="#">电脑</a></li>' +
            '<li><a href="#">空调</a></li>' +
            '<li><a href="#">冰箱</a></li>' +
            '<li><a href="#">衣服</a></li>' +
            '<li><a href="#">吹风机</a></li>' +
            '<li><a href="#">鞋子</a></li>' +
            '<li><a href="#">夹克</a></li>' +
            '<li><a href="#">干衣机</a></li>' +
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

    module.exports = module;
});