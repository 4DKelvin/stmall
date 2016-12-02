define(function (require, exports, module) {
    var angular = require('angular');

    var ngModule = angular.module('cart.service', []);

    ngModule.factory('cartService', ['$request', '$cookie', function ($request, $cookie) {
        return {
            cart: function () {     //购物车 商品列表
                return $request.get('user/cart', {
                    memberId: $cookie('profile').memberId
                });
            },
            editCart: function (productId, skuId, productNum) {     //修改购物车 商品数量
                return $request.put('user/cart', {
                    productId: productId,
                    skuId: skuId,
                    productNum: productNum,
                    memberId: $cookie('profile').memberId
                });
            },
            del: function (cartIds) {       //删除购物车商品
                return $request.delete('user/cart', {
                    memberId: $cookie('profile').memberId,
                    cartIds: cartIds.join("|@|")
                });
            },
            favorite: function (productId, isFavorite) {            //收藏商品 取消收藏
                var params = {
                    memberId: $cookie('profile').memberId,
                    productId: productId
                };
                if (!isFavorite) {
                    return $request.post('user/favorite/product', params);
                } else {
                    return $request.delete('user/favorite/product/' + productId, params);
                }
            },
            /*recommend: function () {        //购物车推荐商品列表
                return $request.get('/user/cart/product', {
                    memberId: $cookie('profile').memberId
                });
            }*/
        }
    }]);

    module.exports = ngModule;
});

