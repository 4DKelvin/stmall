define(function (require, exports, module) {
    var angular = require('angular');

    var ngModule = angular.module('member.service', []);

    ngModule.factory('memberService', ['$request', function ($request) {
        return {
            saveAddress: function (method, address) {
                var addressParam = {
                    id: address.id,
                    memberId: store.get(CacheConstants.memberId, ''),
                    recipient: address.recipient,
                    telephone: address.telephone,
                    mobile: address.mobile,
                    address: address.address,
                    postCode: address.postCode,
                    isDefault: address.isDefault | false,
                    provinceId: address.provinceId,
                    cityId: address.cityId,
                    districtId: address.districtId,
                    subDistrictId: address.subDistrictId,
                    provinceName: address.provinceName,
                    cityName: address.cityName,
                    districtName: address.districtName,
                    subDistrictName: address.subDistrictName
                };
                switch (method) {
                    case 'post':
                        return $request.post('user/address', addressParam);
                    case 'put':
                        return $request.put('user/address', addressParam);
                }
            },
            addressList: function (startIndex, count) {
                return $request.get('user/addresses', {
                    startIndex: startIndex,
                    count: count
                })
            },
            defaultAddress: function (addressId) {
                return $request.put('user/address/' + addressId);
            },
            deleteAddress: function (addressId) {
                return $request.delete('user/address/' + addressId);
            },
        }
    }]);

    module.exports = ngModule;
});

