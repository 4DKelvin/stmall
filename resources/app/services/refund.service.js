define(function (require, exports, module) {
    var angular = require('angular');

    var ngModule = angular.module('refund.service', []);

    ngModule.factory('refundService', ['$request', '$cookie', function ($request, $cookie) {
        return {
            list: function (refundStatus, startIndex, count) {
                return $request.get('/order/refunds', {
                    refundStatus: refundStatus,
                    startIndex: startIndex,
                    count: count
                })
            },
            cancel: function (refundId) {
                return $request.put('/order/refund/' + refundId, {
                    memberId: $cookie('profile').memberId
                });
            },
            remove: function (refundId) {
                return $request.delete('/order/refund/' + refundId, {
                    memberId: $cookie('profile').memberId
                });
            },
            detail: function (refundId) {
                return $request.get('/order/refund/' + refundId, {
                    refundId: refundId,
                    memberId: $cookie('profile').memberId
                });
            }
        }
    }]);


    module.exports = ngModule;
});

