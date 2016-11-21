define(function (require, exports, module) {
    var angular = require('angular'),
        $ = require('jquery');

    var module = angular.module('header', []);

    document.createElement('header');
    module.directive('header', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            template: '<div id="site-nav">' +
            '<div class="sn-box">' +
            '<div class="sn-login-info">' +
            '<em>欢迎来到小能人</em>' +
            '<a class="sn-login" href="#">请登录</a>' +
            '<a class="sn-register" href="#">免费注册</a>' +
            '</div>' +
            '<ul class="sn-quick-menu">' +
            '<li><a ui-sref="my">我的小能人</a></li>' +
            '<li><a href="#"><i class="iconfont icon-like font-purple"></i>我的关注</a></li>' +
            '<li>' +
            '<a href="#"><i class="iconfont icon-gouwuche font-purple"></i>购物车 0 件</a>' +
            '</li>' +
            '<li>' +
            '<div class="sn-menu">收藏夹</div>' +
            '</li>' +
            '<li>' +
            '<a href="#"><i class="iconfont icon-shouji font-purple"></i>手机版</a>' +
            '</li>' +
            '<li><a href="#">商家中心</a></li>' +
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