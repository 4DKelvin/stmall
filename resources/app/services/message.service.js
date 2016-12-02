define(function (require, exports, module) {
    var angular = require('angular');

    var ngModule = angular.module('message.service', []);

    ngModule.factory('messageService', ['$request', '$cookie', function ($request, $cookie) {
        return {
            list: function (type, startIndex, count) {
                return $request.get('/user/message/messageListByType', {
                    memberId: $cookie('profile').memberId,
                    type: type,
                    startIndex: startIndex,
                    count: count
                });
            }
        }
    }]);

    module.exports = ngModule;
});

