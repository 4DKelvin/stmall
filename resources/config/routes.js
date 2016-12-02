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
                            url: '/user/login',
                            templateUrl: $template('/user/login'),
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
                            url: '/my/favor/product/:page',//我的收藏商品
                            params: {
                                page: '1'
                            },
                            templateUrl: $template('/my/collectProduct'),
                            controllerUrl: $action('my'),
                            controller: 'collectProduct'
                        })
                        .state('my/collectShop', {
                            url: '/my/favor/shop/:page',//我的收藏店铺
                            params: {
                                page: '1'
                            },
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
                            url: '/my/orders/:order_status/:page',//我的订单,
                            params: {
                                order_status: '0',
                                page: '1'
                            },
                            templateUrl: $template('/my/orderList'),
                            controllerUrl: $action('my'),
                            controller: 'orderList'
                        })
                        .state('my/complain', {
                            url: '/my/complain/:complain_status/:page',//我的投诉
                            params: {
                                complain_status: '0',
                                page: '1'
                            },
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
                            url: '/my/packet/:packet_status/:page',//我的红包
                            params: {
                                packet_status: '0',
                                page: '1'
                            },
                            templateUrl: $template('/my/redPacket'),
                            controllerUrl: $action('my'),
                            controller: 'redPacket'
                        })
                        .state('my/coupon', {
                            url: '/my/coupon/:coupon_status/:page',//我的红包
                            params: {
                                coupon_status: '1',
                                page: '1'
                            },
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
                            url: '/my/refunds/:refund_status/:page',//退款列表
                            params: {
                                refund_status: '0',
                                page: '1'
                            },
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
                            url: '/my/message/:type/:page',//我的消息
                            params: {
                                type: '1',
                                page: '1'
                            },
                            templateUrl: $template('/my/message'),
                            controllerUrl: $action('my'),
                            controller: 'message'
                        })
                        .state('cart/cart', {
                            url: '/cart/cart',//购物车
                            templateUrl: $template('/cart/cart'),
                            controllerUrl: $action('cart'),
                            controller: 'cart'
                        })
                        .state('product/productDetail', {
                            url: '/product/productDetail',//商品详情
                            templateUrl: $template('/product/productDetail'),
                            controllerUrl: $action('product'),
                            controller: 'productDetail'
                        })
                        .state('product/productList', {
                            url: '/product/list/:page/:branch/:cate/:sort/:ase/:keyword',//商品列表
                            params: {
                                keyword: '',
                                page: '1',
                                cate: '0',
                                branch: '0',
                                sort: '0',
                                ase: '1'
                            },
                            templateUrl: $template('/product/productList'),
                            controllerUrl: $action('product'),
                            controller: 'productList'
                        })
                        .state('pay/confirmOrder', {
                            url: '/pay/confirmOrder',//确认订单
                            templateUrl: $template('/pay/confirmOrder'),
                            controllerUrl: $action('pay'),
                            controller: 'confirmOrder'
                        })
                        .state('pay/payResult', {
                            url: '/pay/payResult',//支付结果
                            templateUrl: $template('/pay/payResult'),
                            controllerUrl: $action('pay'),
                            controller: 'confirmOrder'
                        })
                        .state('register', {
                            url: '/user/register',//注册
                            templateUrl: $template('/user/register'),
                            controllerUrl: $action('register'),
                            controller: 'register'
                        })
                        .state('findPassWord', {
                            url: '/user/findPassWord',//找回密码
                            templateUrl: $template('/user/findPassWord'),
                            controllerUrl: $action('findPassWord'),
                            controller: 'findPassWord'
                        });
                }]);

            ngModule.run(['$rootScope', '$timeout', '$cookie',
                function ($rootScope, $timeout, $cookie) {
                    $rootScope.$on('$stateChangeStart',
                        function (event, toState) {
                            ["/my/", '/cart/'].every(function (obj, index, objs) {
                                // console.log(arguments);
                                if (toState.url.indexOf(obj) == 0) {
                                    //进入我的小能人
                                    if (!$cookie('profile')) {
                                        event.preventDefault();//中断跳转
                                        $rootScope.$state.go('login');//调到登录
                                        return false;
                                    }
                                }
                                return true;
                            });

                        });

                }]);
        }
    };
});