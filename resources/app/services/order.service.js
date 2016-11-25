define(function (require, exports, module) {
    var angular = require('angular');

    var ngModule = angular.module('order.service', []);

    ngModule.factory('orderService', ['$request', '$cookie', function ($request, $cookie) {
        return {
            orders: function (orderStatus, startIndex, count) {
                return $request.get('order/orders', {
                    orderType: 0,
                    orderStatus: orderStatus,
                    startIndex: startIndex,
                    count: count
                });
            },
            order: function (orderId, orderType) {
                return $request.get('order/' + orderId, {
                    orderType: orderType
                });
            },
            cancel: function (orderId) {
                return $request.put('order/cancel', {
                    orderId: orderId,
                    memberId: $cookie('profile').memberId
                });
            },
            receive: function (orderId) {
                return $request.put('order/receive', {
                    orderId: orderId,
                    memberId: $cookie('profile').memberId
                })
            },
            remove: function (orderId) {
                return $request.put('order/delete', {
                    orderId: orderId,
                    memberId: $cookie('profile').memberId
                })
            }
        }
    }]);

    module.exports = ngModule;
});

