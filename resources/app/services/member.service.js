define(function (require, exports, module) {
    var angular = require('angular');

    var ngModule = angular.module('member.service', []);

    ngModule.factory('memberService', ['$request', '$cookie', function ($request, $cookie) {
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
            score: function () {
                return $request.get('user/queryIntegral', {
                    member: $cookie('profile').memberId
                });
            },
            coupons: function (status, startIndex, count) {
                return $request.get('user/coupon/coupons', {
                    ticketStatus: status,
                    startIndex: startIndex,     //开始下标(0开始)
                    count: count          //数量
                });
            },
            redPackets: function (status, startIndex, count) {
                return $request.get('user/redPacket/myRedPacketList', {
                    redPacketStatus: status,
                    startIndex: startIndex,     //开始下标(0开始)
                    count: count           //数量
                });
            },
            shopProductList: function (shopId, hot) {
                return $request.post('products/', {
                    cateIds: "",        //分类id string
                    shopCatId: "",      //店铺分类id  string
                    promotion: "",      //促销（限时抢购-1，团购-3，秒杀-4，预售-advance）
                    longitude: 0,      //经度
                    latitude: 0,       //纬度
                    distance: 0,       //距离
                    productType: 2,    //商品类型 1-服务类 2-实物类
                    specialType: "",    //酒店或旅游(TRAVEL_PRODUCT_CATEGORY 为旅游类商品 HOTEL_PRODUCT_CATEGORY 为酒店类商品)
                    shopId: shopId,         //店铺id
                    shopTags: "",       //店铺标签（使用|@|分隔）（1-财富联盟商户  2-联盟优选商户（已删除） 3-桂银精选商户  4-爱心扶贫商户）
                    sortType: hot ? 'publishTime-asc' : 'soldNum-desc',       //排序条件（score-desc|@|soldNum-desc|@|collections-desc|distance-asc|price-asc|publishTime-asc）
                    keyword: "",        //关键字
                    startIndex: 0,     //开始下标(0开始)
                    count: 5           //数量
                });
            },
            favorProductList: function (startIndex, count) {
                return $request.get('user/favorite/products', {
                    startIndex: startIndex,
                    count: count,
                    latitude: 0,
                    longitude: 0
                })
            },
            deleteFavorProduct: function (productId) {
                return $request.delete('user/favorite/product/' + productId);
            },
            favorShopList: function (startIndex, count) {
                return $request.get('user/favorite/shops', {
                    startIndex: startIndex,
                    count: count,
                    latitude: 0,
                    longitude: 0
                })
            },
            deleteFavorShop: function (shopId) {
                return $request.delete('user/favorite/shop/' + shopId);
            }
        }
    }]);

    module.exports = ngModule;
});

