define(function (require, exports, module) {
    var angular = require('angular'),
        $ = require('jquery');

    var ngModule = angular.module('header', []);

    document.createElement('header');
    ngModule.directive('header', ['$state', '$cookie', '$removeCookie', function ($state, $cookie, $removeCookie) {
        return {
            restrict: 'E',
            template: '<div id="site-nav">' +
            '<div class="sn-box" ng-class="{\'min\':min}">' +
            '<div class="sn-login-info">' +
            '<span ng-if="profile">您好, <span ng-bind="profile.nickName+\' (\'+profile.account+\')\'"></span> </span>' +
            '<em>欢迎来到小能人</em>' +
            '<a class="sn-login" href="javascript:void(0);" ui-sref="login" ng-if="!profile">请登录</a>' +
            '<a class="sn-register" href="javascript:void(0);" ui-sref="register" ng-if="!profile">免费注册</a>' +
            '<a class="sn-register" href="javascript:void(0);" ng-if="profile" ng-click="logout()">退出登录</a>' +
            '</div>' +
            '<ul class="sn-quick-menu">' +
            '<li><a ui-sref="my">我的小能人</a></li>' +
            '<li><a href="javascript:void(0);"><i class="iconfont icon-like font-purple"></i>我的关注</a></li>' +
            '<li>' +
            '<a ui-sref="cart/cart"><i class="iconfont icon-gouwuche font-purple"></i>购物车 <span ng-bind="profile.cartCount+\' 件\'" ng-if="profile.cartCount"></span> </a>' +
            '</li>' +
            '<li>' +
            '<a class="sn-menu" ui-sref="my/collectProduct">收藏夹</a>' +
            '</li>' +
            '<li>' +
            '<a href="javascript:void(0);"><i class="iconfont icon-shouji font-purple"></i>手机版</a>' +
            '</li>' +
            '<li><a href="javascript:void(0);">商家中心</a></li>' +
            '</ul>' +
            '</div>' +
            '</div>',
            scope: {
                min: '='
            },
            controller: function ($scope, $element, $attrs) {
                $scope.profile = $cookie('profile');
                $scope.logout = function () {
                    $scope.profile = $removeCookie('profile');
                    $state.go('login');
                }
            }
        }
    }]);

    module.exports = ngModule;
});