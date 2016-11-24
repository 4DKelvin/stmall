define(function (require, exports, module) {
    module.exports = {
        regRoutes: function (ngModule) {
            ngModule.config(['$stateProvider', '$urlRouterProvider', '$template', '$action',
                function ($stateProvider, $urlRouterProvider, $template, $action) {
                    $urlRouterProvider.otherwise('/');
                    $stateProvider
                        .state('home', {
                            url: '/',
                            templateUrl: $template('home'),
                            controllerUrl: $action('home'),
                            controller: 'home'
                        })
                        .state('login', {
                            url: '/login',
                            templateUrl: $template('login'),
                            controllerUrl: $action('public'),
                            controller: 'login'
                        })
                        .state('my', {
                            url: '/my/',//我的 首页
                            templateUrl: $template('/my/index'),
                            controllerUrl: $action('my'),
                            controller: 'myIndex'
                        })
                        .state('my/collectProduct', {
                            url: '/my/collectProduct',//我的收藏商品
                            templateUrl: $template('/my/collectProduct'),
                            controllerUrl: $action('my'),
                            controller: 'collectProduct'
                        })
                        .state('my/collectShop', {
                            url: '/my/collectShop',//我的收藏店铺
                            templateUrl: $template('/my/collectShop'),
                            controllerUrl: $action('my'),
                            controller: 'collectShop'
                        })
                        .state('my/addressManage', {
                            url: '/my/addressManage',//我的收货地址
                            templateUrl: $template('/my/addressManage'),
                            controllerUrl: $action('my'),
                            controller: 'addressManage'
                        })
                        .state('my/orderList', {
                            url: '/my/orderList',//我的订单
                            templateUrl: $template('/my/orderList'),
                            controllerUrl: $action('my'),
                            controller: 'orderList'
                        })
                        .state('my/complain', {
                            url: '/my/complain',//我的投诉
                            templateUrl: $template('/my/complain'),
                            controllerUrl: $action('my'),
                            controller: 'complain'
                        })
                        .state('my/score', {
                            url: '/my/score',//我的投诉
                            templateUrl: $template('/my/score'),
                            controllerUrl: $action('my'),
                            controller: 'score'
                        })
                        .state('my/redPacket', {
                            url: '/my/redPacket',//我的红包
                            templateUrl: $template('/my/redPacket'),
                            controllerUrl: $action('my'),
                            controller: 'redPacket'
                        })
                        .state('my/coupon', {
                            url: '/my/coupon',//我的红包
                            templateUrl: $template('/my/coupon'),
                            controllerUrl: $action('my'),
                            controller: 'coupon'
                        })
                        .state('my/bankCard', {
                            url: '/my/bankCard',//我的银行卡
                            templateUrl: $template('/my/bankCard'),
                            controllerUrl: $action('my'),
                            controller: 'bankCard'
                        })
                        .state('my/addBankCard', {
                            url: '/my/addBankCard',//我的银行卡
                            templateUrl: $template('/my/addBankCard'),
                            controllerUrl: $action('my'),
                            controller: 'bankCard'
                        })
                        .state('my/applyRefund', {
                            url: '/my/applyRefund',//申请退款
                            templateUrl: $template('/my/applyRefund'),
                            controllerUrl: $action('my'),
                            controller: 'refund'
                        })
                        .state('my/refundList', {
                            url: '/my/refundList',//退款列表
                            templateUrl: $template('/my/refundList'),
                            controllerUrl: $action('my'),
                            controller: 'refund'
                        })
                        .state('my/comment', {
                            url: '/my/comment',//评价
                            templateUrl: $template('/my/comment'),
                            controllerUrl: $action('my'),
                            controller: 'comment'
                        })
                        .state('my/commentList', {
                            url: '/my/commentList',//评价列表
                            templateUrl: $template('/my/commentList'),
                            controllerUrl: $action('my'),
                            controller: 'comment'
                        })
                        .state('my/message', {
                            url: '/my/message',//我的消息
                            templateUrl: $template('/my/message'),
                            controllerUrl: $action('my'),
                            controller: 'message'
                        })
                        .state('cart/cart',{
                            url:'/cart/cart',//购物车
                            templateUrl:$template('/cart/cart'),
                            controllerUrl: $action('cart'),
                            controller: 'cart'
                        })
                        .state('product/productDetail',{
                            url:'/product/productDetail',//商品详情
                            templateUrl:$template('/product/productDetail'),
                            controllerUrl: $action('product'),
                            controller: 'productDetail'
                        })
                        .state('product/productList',{
                            url:'/product/productList',//商品列表
                            templateUrl:$template('/product/productList'),
                            controllerUrl: $action('product'),
                            controller: 'productList'
                        });
                }]);

            ngModule.run(['$rootScope', '$timeout', '$cookie',
                function ($rootScope, $timeout, $cookie) {
                    $rootScope.$on('$stateChangeStart',
                        function (event, toState) {
                            if (toState.url.indexOf('/my') == 0) {
                                //进入我的小能人
                                if (!$cookie('profile')) {
                                    event.preventDefault();//中断跳转
                                    $rootScope.$state.go('login');//调到登录
                                }

                            }
                        });

                }]);
        }
    };
});