define(function (require, exports, module) {
    var angular = require('angular'),
        $ = require('jquery');


    document.createElement('footer');
    var ngModule = angular.module('footer', []);

    ngModule.directive('footer', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            template: '<div id="footer">' +
            '<div class="gl-ensure">' +
            '<a href="javascript:void(0);" class="gl-ensure-01"></a>' +
            '<a href="javascript:void(0);" class="gl-ensure-02"></a>' +
            '<a href="javascript:void(0);" class="gl-ensure-03"></a>' +
            '<a href="javascript:void(0);" class="gl-ensure-04"></a>' +
            '</div>' +
            '<div class="gl-desc">' +
            '<div class="desc">' +
            '<dl class="shipping">' +
            '<dt>配送方式</dt>' +
            '<dd><a href="javascript:void(0);">客户自提</a></dd>' +
            '<dd><a href="javascript:void(0);">配送到家</a></dd>' +
            '<dd><a href="javascript:void(0);">运费标准</a></dd>' +
            '<dd><a href="javascript:void(0);">配送时间</a></dd>' +
            '</dl>' +
            '<dl class="pay">' +
            '<dt>支付方式</dt>' +
            '<dd><a href="javascript:void(0);">快捷支付</a></dd>' +
            '<dd><a href="javascript:void(0);">微信支付</a></dd>' +
            '<dd><a href="javascript:void(0);">支付宝</a></dd>' +
            '<dd><a href="javascript:void(0);">积分支付</a></dd>' +
            '<dd><a href="javascript:void(0);">账户余额</a></dd>' +
            '</dl>' +
            '<dl class="service">' +
            '<dt>售后服务</dt>' +
            '<dd><a href="javascript:void(0);">退换货政策</a></dd>' +
            '<dd><a href="javascript:void(0);">退换货流程</a></dd>' +
            '<dd><a href="javascript:void(0);">投诉与回复</a></dd>' +
            '<dd><a href="javascript:void(0);">发票制度</a></dd>' +
            '</dl>' +
            '<dl class="faq">' +
            '<dt>常见问题</dt>' +
            '<dd><a href="javascript:void(0);">如何使用红包</a></dd>' +
            '<dd><a href="javascript:void(0);">如何领取优惠劵</a></dd>' +
            '<dd><a href="javascript:void(0);">如何使用预付卡</a></dd>' +
            '<dd><a href="javascript:void(0);">如何充值</a></dd>' +
            '</dl>' +
            '</div>' +
            '<div class="mobile">' +
            '<dl>' +
            '<dt>手机版（苹果）</dt>' +
            '<dd><img ng-lazy="images/tem/erwm.jpg" alt=""></dd>' +
            '</dl>' +
            '<dl>' +
            '<dt>手机版（安卓）</dt>' +
            '<dd><img ng-lazy="images/tem/erwm.jpg" alt=""></dd>' +
            '</dl>' +
            '</div>' +
            '</div>' +
            '<div class="gl-copyright">' +
            '<a href="javascript:void(0);">关于我们</a>｜<a href="javascript:void(0);">服务条款</a>｜<a href="javascript:void(0);">友情链接</a>｜<a href="javascript:void(0);">帮助中心</a><br>' +
            'Copyright@2016-2020 广西桂林银行版权所有ICP-桂' +
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