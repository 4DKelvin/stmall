define(function (require, exports, module) {
    var angular = require('angular');

    var ngModule = angular.module('public.service', []);

    ngModule.factory('publicService', ['$request', function ($request) {
        return {
            login: function (userName, password) {
                return $request.post('login', {
                    username: userName,
                    password: password
                })
            },
            register: function (mobile, verifyCode, account, password, accountManagerId) {
                return $request.post('register', {
                    mobile: mobile,
                    verifyCode: verifyCode,
                    account: account,
                    password: password,
                    accountManagerId: accountManagerId
                })
            },
            personInfo: function (memberId) {
                return $request.get('user/personalInfo', {
                    member: memberId
                })
            },
            verifyCode: function (mobile, type) {
                return $request.post('verify', {
                    mobile: mobile,
                    type: type
                });
            },
            checkoutVerifyCode: function (mobile, verifyCode, type) {
                return $request.get('verify/validation', {
                    mobile: mobile,
                    verifyCode: verifyCode,
                    type: type
                })
            },
            cityList: function (id) {
                return $request.get('region/getRegionByParentId', {
                    id: id
                });
            },
            favorProductList: function (startIndex, count) {
                return $request.get('user/favorite/products', {
                    startIndex: startIndex,
                    count: count
                })
            },
            deleteFavorProduct: function (productId) {
                return $request.delete('user/favorite/product/' + productId);
            },
            favorShopList: function (startIndex, count) {
                return $request.get('user/favorite/shops', {
                    startIndex: startIndex,
                    count: count
                })
            },
            deleteFavorShop: function (shopId) {
                return $request.delete('user/favorite/shop/' + shopId);
            },
            queryIntegration: function (memberId) {
                return $request.get('user/queryIntegral', {
                    member: memberId
                })
            }
        }
    }]);

    module.exports = ngModule;
});

