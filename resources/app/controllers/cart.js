define(function(require){
    var app = require('app'),
        image = require('components/image'),
        header = require('components/header'),
        search = require('components/search'),
        footer = require('components/footer'),
        subNav = require('components/subNav'),
        cartService = require('services/cart.service');

    /** ng异步载入 */
    app.useModule(['image', 'header', 'search', 'footer','subNav','cart.service']);

    app.controller('cart',['$rootScope', '$scope', 'cartService',function($rootScope, $scope, cartService) {
        $scope.cartService = cartService;

        //购物车列表
        /*
         cartService.cart().then(function (res) {
         $scope.totalAmount = res&&res.totalAmount || 0;
         $scope.shopList = res&&res.shopList || [];
         }, function (err) {
         });
         */
         cartService.recommend().then(function (res) {
         $scope.recommend = res&&res.data || [];
         }, function (err) {
         });



        var res = {
            totalAmount: 1000000.00,
            shopList:[
                {
                    id: 'shopId00001',
                    shopName: 'moco旗舰店',
                    logo: 'images/tem/my_shop_logo.jpg',
                    couponNum: '5',             //优惠券数量
                    deliveryMode: '1',          //1、送货上门  2、自提
                    deliveryableNum: '15.00',   //运费
                    buyProductList:[
                        {
                            id: "productId0000000000001",
                            title: "Mo&Co.圆领套头落肩喇叭袖纯色百搭羊毛针织衫MA1633SWT25 moco",
                            mainImage: "images/tem/tem_floor_pro.jpg",
                            shopPrice: "1299.00",
                            skuId: "",
                            productNum: "2",
                            productAttributes: "颜色分类：深宝蓝色 <br> 尺码：M/165",
                            productSkuStock: "100",
                            productStatus: ""
                        }, {
                            id: "productId0000000000002",
                            title: "Mo&Co.圆领套头落肩喇叭袖纯色百搭羊毛针织衫MA1633SWT25 moco",
                            mainImage: "images/tem/tem_floor_pro.jpg",
                            shopPrice: "1299.00",
                            skuId: "",
                            productNum: "2",
                            productAttributes: "颜色分类：深宝蓝色 <br> 尺码：M/165",
                            productSkuStock: "100",
                            productStatus: ""
                        }, {
                            id: "productId0000000000003",
                            title: "Mo&Co.圆领套头落肩喇叭袖纯色百搭羊毛针织衫MA1633SWT25 moco",
                            mainImage: "images/tem/tem_floor_pro.jpg",
                            shopPrice: "1299.00",
                            skuId: "",
                            productNum: "2",
                            productAttributes: "颜色分类：深宝蓝色 <br> 尺码：M/165",
                            productSkuStock: "100",
                            productStatus: ""
                        }
                    ]
                }, {
                    id: 'shopId00002',
                    shopName: 'moco旗舰店',
                    logo: 'images/tem/my_shop_logo.jpg',
                    couponNum: '5',             //优惠券数量
                    deliveryMode: '1',          //1、送货上门  2、自提
                    deliveryableNum: '15.00',   //运费
                    buyProductList:[
                        {
                            id: "productId0000000000021",
                            title: "Mo&Co.圆领套头落肩喇叭袖纯色百搭羊毛针织衫MA1633SWT25 moco",
                            mainImage: "images/tem/tem_floor_pro.jpg",
                            shopPrice: "1299.00",
                            skuId: "",
                            productNum: "2",
                            productAttributes: "颜色分类：深宝蓝色 <br> 尺码：M/165",
                            productSkuStock: "100",
                            productStatus: ""
                        }, {
                            id: "productId0000000000022",
                            title: "Mo&Co.圆领套头落肩喇叭袖纯色百搭羊毛针织衫MA1633SWT25 moco",
                            mainImage: "images/tem/tem_floor_pro.jpg",
                            shopPrice: "1299.00",
                            skuId: "",
                            productNum: "2",
                            productAttributes: "颜色分类：深宝蓝色 <br> 尺码：M/165",
                            productSkuStock: "100",
                            productStatus: ""
                        }, {
                            id: "productId0000000000023",
                            title: "Mo&Co.圆领套头落肩喇叭袖纯色百搭羊毛针织衫MA1633SWT25 moco",
                            mainImage: "images/tem/tem_floor_pro.jpg",
                            shopPrice: "1299.00",
                            skuId: "",
                            productNum: "2",
                            productAttributes: "颜色分类：深宝蓝色 <br> 尺码：M/165",
                            productSkuStock: "100",
                            productStatus: ""
                        }
                    ]
                }, {
                    id: 'shopId00003',
                    shopName: 'moco旗舰店',
                    logo: 'images/tem/my_shop_logo.jpg',
                    couponNum: '5',             //优惠券数量
                    deliveryMode: '1',          //1、送货上门  2、自提
                    deliveryableNum: '15.00',   //运费
                    buyProductList:[
                        {
                            id: "productId0000000000031",
                            title: "Mo&Co.圆领套头落肩喇叭袖纯色百搭羊毛针织衫MA1633SWT25 moco",
                            mainImage: "images/tem/tem_floor_pro.jpg",
                            shopPrice: "1299.00",
                            skuId: "",
                            productNum: "2",
                            productAttributes: "颜色分类：深宝蓝色 <br> 尺码：M/165",
                            productSkuStock: "100",
                            productStatus: ""
                        }, {
                            id: "productId0000000000032",
                            title: "Mo&Co.圆领套头落肩喇叭袖纯色百搭羊毛针织衫MA1633SWT25 moco",
                            mainImage: "images/tem/tem_floor_pro.jpg",
                            shopPrice: "1299.00",
                            skuId: "",
                            productNum: "2",
                            productAttributes: "颜色分类：深宝蓝色 <br> 尺码：M/165",
                            productSkuStock: "100",
                            productStatus: ""
                        }, {
                            id: "productId0000000000033",
                            title: "Mo&Co.圆领套头落肩喇叭袖纯色百搭羊毛针织衫MA1633SWT25 moco",
                            mainImage: "images/tem/tem_floor_pro.jpg",
                            shopPrice: "1299.00",
                            skuId: "",
                            productNum: "2",
                            productAttributes: "颜色分类：深宝蓝色,尺码：M/165",
                            productSkuStock: "100",
                            productStatus: ""
                        }
                    ]
                }
            ]
        };

        $scope.totalAmount = res&&res.totalAmount || 0;
        $scope.shopList = res&&res.shopList || [];

        //初始化 是否勾选 商品
        for (var i=0;i<$scope.shopList.length;i++) {
            $scope.shopList[i].selected = false;
            for (var j=0;$scope.shopList[i].buyProductList&&(j<$scope.shopList[i].buyProductList.length);j++) {
                $scope.shopList[i].buyProductList[j].selected = false;
            }
        }

        //选择
        $scope.select = function (shopId, cartId, sel) {
            console.log(arguments);
            var isSelectedAll = true;
            for (var i=0;i<$scope.shopList.length;i++) {
                if (!shopId) {//全选 反选
                    for (var j=0;$scope.shopList[i].buyProductList&&(j<$scope.shopList[i].buyProductList.length);j++) {
                        $scope.shopList[i].buyProductList[j].selected = sel;
                    }
                    $scope.shopList[i].selected = sel;
                } else if (shopId == $scope.shopList[i].id) {//选择某个店铺
                    for (var j=0;$scope.shopList[i].buyProductList&&(j<$scope.shopList[i].buyProductList.length);j++) {
                        if (!cartId||(cartId == $scope.shopList[i].buyProductList[j].id)) {//选择某个店铺（ 只传店铺id 不传 购物车 id ）//(cartId == id)选择店铺下的某个商品
                            $scope.shopList[i].buyProductList[j].selected = sel;
                        }
                        sel = sel&&$scope.shopList[i].buyProductList[j].selected;
                    }
                    $scope.shopList[i].selected = sel;
                }
                isSelectedAll = isSelectedAll&&$scope.shopList[i].selected;
            }
            $scope.isSelectedAll = isSelectedAll;
        };

        //得到选择的cartIds
        $scope.getSelectedCartIds = function () {
            var selectedCartIds = [];
            for (var i=0;i<$scope.shopList.length;i++) {
                for (var j=0;$scope.shopList[i].buyProductList&&(j<$scope.shopList[i].buyProductList.length);j++) {
                    if ($scope.shopList[i].buyProductList[j].selected) {
                        selectedCartIds.push($scope.shopList[i].buyProductList[j].id);
                    }
                }
            }
            return selectedCartIds.join("|@|");
        }
    }]);

});