define(function (require, exports, module) {
    var angular = require('angular');

    var ngModule = angular.module('complain.service', []);

    ngModule.factory('complainService', ['$request', '$cookie', function ($request, $cookie) {
        return {
            list: function (complaintStatus, startIndex, count) {
                return $request.get('/order/complaints', {
                    complaintStatus: complaintStatus,
                    startIndex: startIndex,
                    count: count
                });
            },
            cancel: function (orderId) {
                return $request.put('/order/complaint/' + orderId);
            },
            remove: function (orderId) {
                return $request.delete('/order/complaint/' + orderId);
            },
            detail: function (orderId) {
                return $request.get('/order/complaint/' + orderId);
            },
            complain: function (orderId, memberId, shopId, complaintType, complaintContent, thumbs) {
                var params = {
                    orderId: orderId,
                    memberId: memberId,
                    shopId: shopId,
                    complaintType: complaintType,
                    complaintContent: complaintContent
                };
                thumbs.forEach(function (thumb, index) {
                    params['thumb0' + index] = thumb;
                });
                return $request.post('/order/complaint', params);
            }
        }
    }]);


    module.exports = ngModule;
});

