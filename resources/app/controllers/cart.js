define(function (require) {
    var app = require('app'),
        image = require('components/image'),
        header = require('components/header'),
        footer = require('components/footer'),
        search = require('components/search'),
        suggest = require('components/suggest'),
        cartService = require('services/cart.service');

    /** ng异步载入 */
    app.useModule(['image', 'header', 'search', 'footer', 'suggest', 'cart.service']);

    app.controller('cart', ['$rootScope', '$scope', 'cartService', '$cookie', function ($rootScope, $scope, cartService, $cookie) {
        $scope.cartService = cartService;

        //购物车列表
        cartService.cart().then(function (res) {
            $scope.shopList = res && res.shopList || [];
            $cookie('profile', $.extend($cookie('profile'), {
                "cartCount": $scope.shopList.length
            }));
        }, function (err) {
        });

        //初始化 是否勾选 商品
        for (var i = 0; i < $scope.shopList && $scope.shopList.length; i++) {
            $scope.shopList[i].selected = false;
            for (var j = 0; $scope.shopList[i].buyProductList && (j < $scope.shopList[i].buyProductList.length); j++) {
                $scope.shopList[i].buyProductList[j].selected = false;
            }
        }

        //选择
        $scope.select = function (shopId, cartId, sel) {
            // console.log(arguments);
            var isSelectedAll = true;
            for (var i = 0; i < $scope.shopList.length; i++) {
                if (!shopId) {//全选 反选
                    for (var j = 0; $scope.shopList[i].buyProductList && (j < $scope.shopList[i].buyProductList.length); j++) {
                        $scope.shopList[i].buyProductList[j].selected = sel;
                    }
                    $scope.shopList[i].selected = sel;
                } else if (shopId == $scope.shopList[i].id) {//选择某个店铺
                    var isSelected = true;
                    for (var j = 0; $scope.shopList[i].buyProductList && (j < $scope.shopList[i].buyProductList.length); j++) {
                        if (!cartId || (cartId == $scope.shopList[i].buyProductList[j].cartId)) {//选择某个店铺（ 只传店铺id 不传 购物车 cartId ）//(cartId == id)选择店铺下的某个商品
                            $scope.shopList[i].buyProductList[j].selected = sel;
                        }
                        isSelected = isSelected && $scope.shopList[i].buyProductList[j].selected;
                    }
                    $scope.shopList[i].selected = isSelected;
                }
                isSelectedAll = isSelectedAll && $scope.shopList[i].selected;
            }
            $scope.isSelectedAll = isSelectedAll;
        };

        //得到选择的cartIds
        $scope.getSelectedCartIds = function () {
            var selectedCartIds = [];
            for (var i = 0; i < $scope.shopList && $scope.shopList.length; i++) {
                for (var j = 0; $scope.shopList[i].buyProductList && (j < $scope.shopList[i].buyProductList.length); j++) {
                    if ($scope.shopList[i].buyProductList[j].selected) {
                        selectedCartIds.push($scope.shopList[i].buyProductList[j].cartId);
                    }
                }
            }
            return selectedCartIds;
        };

        //得到选择的总计
        $scope.getSelectedTotalAmount = function () {
            var totalAmount = 0;
            for (var i = 0; i < $scope.shopList.length; i++) {
                for (var j = 0; $scope.shopList[i].buyProductList && (j < $scope.shopList[i].buyProductList.length); j++) {
                    var obj = $scope.shopList[i].buyProductList[j];
                    if (obj.selected) {
                        totalAmount += obj.shopPrice * obj.productNum;
                    }
                }
            }
            $scope.totalAmount = totalAmount;
        };

        //删除商品操作
        $scope.delProduct = function (productList) {
            console.log(productList);
            cartService.del(productList).then(function (res) {
                for (var k = 0; k < productList.length; k++) {
                    var isFind = false;
                    for (var i = 0; i < $scope.shopList.length; i++) {
                        for (var j = 0; $scope.shopList[i].buyProductList && (j < $scope.shopList[i].buyProductList.length); j++) {
                            if ($scope.shopList[i].buyProductList[j].cartId == productList[k]) {
                                $scope.shopList[i].buyProductList.splice(j, 1);
                                isFind = true;
                                break;
                            }
                        }
                        if (isFind) {
                            break;
                        }
                    }
                }
            }, function (err) {
                //删除失败
            });
        };

        //购买数改变操作
        $scope.buyNumChange = function (product, productNum) {
            console.log(product, productNum);
            if (productNum <= 0) {
                return;
            }
            if (!Number(productNum)) {//输入非数字
                //请输入合法数字
                $rootScope.$dialog.$alert('请输入合法数字');
                return;
            }
            if ((Number(productNum) >= 1) && (Number(productNum) <= Number(product.productSkuStock))) {
                cartService.editCart(product.productId, product.skuId, productNum).then(function (res) {
                    product.productNum = productNum;
                    $scope.getSelectedTotalAmount();
                }, function (err) {
                    // console.log(err.desc);
                    // $rootScope.$dialog.$alert(err.desc);
                });
                // product.productNum=productNum;
                // $scope.getSelectedTotalAmount();
            } else {
                //超出购买范围
                $rootScope.$dialog.$alert('超出购买范围');
            }
        };
    }]);

});