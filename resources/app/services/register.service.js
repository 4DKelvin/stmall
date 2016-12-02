define(function (require, exports, module) {
    var angular = require('angular');

    var ngModule = angular.module('register.service', []);

    ngModule.factory('registerService', ['$request', function ($request) {
        return {
            preProcess: function () {  // 极验预处理
                return $request.get('geetest/preProcess');
            },
            check: function (params) {  //校验手机号是否被注册
                return $request.get('register/check', {
                    geetest_challenge: params.geetest_challenge,        //
                    geetest_seccode: params.geetest_seccode,          //
                    geetest_validate: params.geetest_validate,          //
                    mobile: params.mobile                              //
                });
            },

        }
    }]);

    module.exports = ngModule;
});

