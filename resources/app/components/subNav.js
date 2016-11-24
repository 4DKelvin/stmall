define(function (require, exports, module) {
    var angular = require('angular'),
        $ = require('jquery');


    document.createElement('sub-nav');
    var ngModule = angular.module('subNav', []);

    ngModule.directive('subNav', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            template: '<div class="col-sub">' +
            '<dl>' +
            '<dt><a ui-sref="my/orderList">我的订单</a></dt>' +
            '</dl>' +
            '<dl>' +
            '<dt><a ui-sref="my/refundList">我的退款</a></dt>' +
            '</dl>' +
            '<dl>' +
            '<dt ng-init="c1=true">' +
            '<a href="javascript:void(0);" ng-click="c1=!c1">我的优惠</a>' +
            '<i class="iconfont" ng-class="{\'icon-xia\':!c1,\'icon-circle_up_on\':c1}"></i>' +
            '</dt>' +
            '<dd ng-show="c1" class="animated fadeInDown"><a ui-sref="my/redPacket">我的红包</a></dd>' +
            '<dd ng-show="c1" class="animated fadeInDown"><a ui-sref="my/coupon">我的优惠劵</a></dd>' +
            '</dl>' +
            '<dl><dt><a ui-sref="my/score">我的积分</a></dt></dl>' +
            '<dl><dt><a ui-sref="my/commentList">我的评价</a></dt></dl>' +
            '<dl><dt><a ui-sref="my/bankCard">我的银行卡</a></dt></dl>' +
            '<dl><dt><a ui-sref="my/complain">我的投诉</a></dt></dl>' +
            '<dl><dt><a ui-sref="my/collectProduct">我的收藏</a></dt></dl>' +
            '<dl>' +
            '<dt ng-init="c2=true">' +
            '<a href="javascript:void(0);" ng-click="c2=!c2">个人信息</a>' +
            '<i class="iconfont" ng-class="{\'icon-xia\':!c2,\'icon-circle_up_on\':c2}"></i>' +
            '</dt>' +
            '<dd ng-show="c2" class="animated fadeInDown"><a href="javascript:void(0);">基本资料</a></dd>' +
            '<dd ng-show="c2" class="animated fadeInDown"><a ui-sref="my/addressManage">收货地址</a></dd>' +
            '</dl>' +
            '<dl>' +
            '<dt ng-init="c3=true">' +
            '<a href="javascript:void(0);" ng-click="c3=!c3">生活缴费</a>' +
            '<i class="iconfont" ng-class="{\'icon-xia\':!c3,\'icon-circle_up_on\':c3}"></i>' +
            '</dt>' +
            '<dd ng-show="c3" class="animated fadeInDown"><a href="javascript:void(0);">缴纳电费</a></dd>' +
            '<dd ng-show="c3" class="animated fadeInDown"><a href="javascript:void(0);">缴纳水费</a></dd>' +
            '</dl>' +
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