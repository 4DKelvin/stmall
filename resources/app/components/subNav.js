define(function (require, exports, module) {
    var angular = require('angular'),
        $ = require('jquery'),
        cookie = require('cookie');


    document.createElement('sub-nav');
    var ngModule = angular.module('subNav', []);

    ngModule.directive('subNav', ['$cookie', '$state', function ($cookie, $state) {
        return {
            restrict: 'E',
            template: '<div class="col-sub">' +
            '<dl>' +
            '<dt><a ng-class="{\'cut\':isActive(\'my/orderList\')}" ui-sref="my/orderList">我的订单</a></dt>' +
            '</dl>' +
            '<dl>' +
            '<dt><a ng-class="{\'cut\':isActive(\'my/refundList\')}" ui-sref="my/refundList">我的退款</a></dt>' +
            '</dl>' +
            '<dl>' +
            '<dt>' +
            '<a href="javascript:void(0);" ng-click="navStatus.c1=!navStatus.c1">我的优惠</a>' +
            '<i class="iconfont" ng-class="{\'icon-xia\':!c1,\'icon-circle_up_on\':c1}"></i>' +
            '</dt>' +
            '<dd ng-show="navStatus.c1">' +
            '<a ng-class="{\'cut\':isActive(\'my/redPacket\')}" ui-sref="my/redPacket">我的红包</a>' +
            '</dd>' +
            '<dd ng-show="navStatus.c1">' +
            '<a ng-class="{\'cut\':isActive(\'my/coupon\')}" ui-sref="my/coupon">我的优惠劵</a>' +
            '</dd>' +
            '</dl>' +
            '<dl><dt><a ng-class="{\'cut\':isActive(\'my/score\')}" ui-sref="my/score">我的积分</a></dt></dl>' +
            '<dl><dt><a ng-class="{\'cut\':isActive(\'my/commentList\')}" ui-sref="my/commentList">我的评价</a></dt></dl>' +
            '<dl><dt><a ng-class="{\'cut\':isActive(\'my/bankCard\')}" ui-sref="my/bankCard">我的银行卡</a></dt></dl>' +
            '<dl><dt><a ng-class="{\'cut\':isActive(\'my/complain\')}" ui-sref="my/complain">我的投诉</a></dt></dl>' +
            '<dl><dt><a ng-class="{\'cut\':isActive(\'my/collectProduct\')}" ui-sref="my/collectProduct">我的收藏</a></dt></dl>' +
            '<dl>' +
            '<dt>' +
            '<a href="javascript:void(0);" ng-click="navStatus.c2=!navStatus.c2">个人信息</a>' +
            '<i class="iconfont" ng-class="{\'icon-xia\':!c2,\'icon-circle_up_on\':c2}"></i>' +
            '</dt>' +
            '<dd ng-show="navStatus.c2">' +
            '<a href="javascript:void(0);">基本资料</a>' +
            '</dd>' +
            '<dd ng-show="navStatus.c2">' +
            '<a ng-class="{\'cut\':isActive(\'my/addressManage\')}" ui-sref="my/addressManage">收货地址</a>' +
            '</dd>' +
            '</dl>' +
            '<dl>' +
            '<dt>' +
            '<a href="javascript:void(0);" ng-click="navStatus.c3=!navStatus.c3">生活缴费</a>' +
            '<i class="iconfont" ng-class="{\'icon-xia\':!c3,\'icon-circle_up_on\':c3}"></i>' +
            '</dt>' +
            '<dd ng-show="navStatus.c3"><a href="javascript:void(0);">缴纳电费</a></dd>' +
            '<dd ng-show="navStatus.c3"><a href="javascript:void(0);">缴纳水费</a></dd>' +
            '</dl>' +
            '</div>',
            scope: {},
            controller: function ($scope, $element, $attrs) {
                $scope.navStatus = $cookie('navStatus') || {};
                $scope.$watch('navStatus', function () {
                    $cookie('navStatus', $scope.navStatus);
                }, true);
                $scope.isActive = function (url) {
                    return $state.$current.self.name == url;
                }
            }
        }
    }]);

    module.exports = ngModule;
});