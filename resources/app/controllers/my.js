define(function (require) {
    var app = require('app'),
        image = require('components/image'),
        header = require('components/header'),
        search = require('components/search'),
        footer = require('components/footer'),
        suggest = require('components/suggest'),
        subNav = require('components/subNav'),
        pager = require('components/pager'),
        favor = require('components/favor'),
        member = require('services/member.service'),
        order = require('services/order.service'),
        refund = require('services/refund.service'),
        complain = require('services/complain.service'),
        card = require('services/card.service'),
        message = require('services/message.service');

    var orderStatuses = [
        {'value': 0, 'name': '全部订单'},
        {'value': 1, 'name': '待付款'},
        {'value': 2, 'name': '待发货'},
        {'value': 3, 'name': '待收货'},
        {'value': 5, 'name': '待评价'}
    ];
    var refundStatuses = [
        {value: 0, name: '全部退款'},
        {value: 1, name: '待处理'},
        {value: 3, name: '拒绝退款'},
        {value: 2, name: '已完成'}
    ];
    var couponStatus = [
        {value: 1, name: '可用'},
        {value: 3, name: '过期'},
        {value: 2, name: '已使用'}
    ];
    var redPacketStatus = [
        {value: 0, name: '可用'},
        {value: 2, name: '过期'},
        {value: 1, name: '已使用'}
    ];
    var complainTypes = [
        {value: 0, name: '全部投诉'},
        {value: 1, name: '待处理'},
        {value: 2, name: '已处理'},
        {value: 3, name: '已完成'}
    ];
    var complainReasonTypes = [
        {value: 1, name: '商户拒绝退款'},
        {value: 2, name: '商品质量问题'},
        {value: 3, name: '服务质量问题'},
        {value: 4, name: '其他'}
    ];
    var messageTypes = [
        {value: 1, name: '服务提醒'},
        {value: 2, name: '平台交易'},
        {value: 4, name: '平台活动'}
    ];

    /** ng异步载入 */
    app.useModule(['image', 'suggest', 'header', 'search', 'footer', 'favor', 'subNav', 'pager', 'member.service', 'order.service', 'refund.service', 'complain.service', 'card.service', 'message.service']);

    app.controller('myIndex', ['$scope', 'orderService', '$cookie', '$rootScope',
        function ($scope, orderService, $cookie, $rootScope) {
            //我的 首页
            $scope.profile = $cookie('profile');
            orderService.orders(0, 0, 3).then(function (res) {
                $scope.list = res ? res.list.map(function (item) {
                    var arr = item.operationDesc.split(',');
                    item.operations = [];
                    arr.forEach(function (e) {
                        if (e == '删除') {
                            item.canDelete = true;
                        } else {
                            if (e) {
                                item.operations.push({
                                    name: e
                                });
                            }
                        }
                    });
                    return item;
                }) : [];
            }, function (err) {

            });
        }]).controller('collectProduct', ['$scope', 'memberService', '$rootScope',
        function ($scope, memberService, $rootScope) {
            //我的收藏商品
            memberService.favorProductList(($rootScope.$stateParams.page - 1) * 14, 14).then(function (res) {
                $scope.pager = {
                    pageSize: 14,
                    startIndex: $rootScope.$stateParams.page,
                    total: res.total
                };
                $scope.list = res.list ? res.list : [];
            }, function (err) {

            });
            $scope.remove = function (item) {
                memberService.deleteFavorProduct(item.productId).then(function () {
                    $scope.list.splice($scope.list.indexOf(item), 1);
                });
            };
            $scope.change = function (page) {
                $rootScope.$state.go('my/collectProduct', {
                    page: page
                });
            };
        }]).controller('collectShop', ['$scope', 'memberService', '$rootScope',
        function ($scope, memberService, $rootScope) {
            //我的收藏店铺
            memberService.favorShopList(($rootScope.$stateParams.page - 1) * 10, 10).then(function (res) {
                $scope.pager = {
                    pageSize: 10,
                    startIndex: $rootScope.$stateParams.page,
                    total: res.total
                };
                $scope.list = res.list ? res.list : [];
                $scope.list.forEach(function (item) {
                    $scope.switcher(item);
                });
            }, function (err) {

            });
            $scope.switcher = function (item) {
                memberService.shopProductList(item.shopId, item.hot).then(function (res) {
                    item.productList = res.list;
                }, function (err) {

                });
            };
            $scope.remove = function (item) {
                memberService.deleteFavorShop(item.id).then(function () {
                    $scope.list.splice($scope.list.indexOf(item), 1);
                });
            };
            $scope.change = function (page) {
                $rootScope.$state.go('my/collectShop', {
                    page: page
                });
            };
        }]).controller('addressManage', ['$scope', 'memberService',
        function ($scope, memberService) {
            //我的收货地址
            memberService.addressList(1, 10).then(function (res) {
                $scope.list = res ? res.list : [];
            }, function (err) {

            });
            $scope.setDefault = function (address) {
                memberService.defaultAddress(address.id).then(function (res) {
                    $scope.list = $scope.list.map(function (item) {
                        item.default = false;
                        return item;
                    });
                    address.default = true;
                });
            };
            $scope.remove = function (address) {
                memberService.deleteAddress(address.id).then(function (res) {
                    $scope.list.splice($scope.list.indexOf(address), 1);
                });
            };
        }]).controller('orderList', ['$scope', 'orderService', '$rootScope', '$state',
        function ($scope, orderService, $rootScope) {
            //我的订单
            $scope.orderStatuses = orderStatuses;
            $scope.orderStatus = $rootScope.$stateParams.order_status;
            orderService.orders($rootScope.$stateParams.order_status, ($rootScope.$stateParams.page - 1) * 10, 10).then(function (res) {
                $scope.pager = {
                    pageSize: 10,
                    startIndex: $rootScope.$stateParams.page,
                    total: res.total
                };
                $scope.list = res ? res.list.map(function (item) {
                    var arr = item.operationDesc.split(',');
                    item.operations = [];
                    arr.forEach(function (e) {
                        if (e == '删除') {
                            item.canDelete = true;
                        } else {
                            if (e) {
                                item.operations.push({
                                    name: e
                                });
                            }
                        }
                    });
                    return item;
                }) : [];
            }, function (err) {

            });
            $scope.change = function (page) {
                $rootScope.$state.go('my/orderList', {
                    page: page,
                    order_status: $scope.orderStatus
                });
            };
            $scope.remove = function (item) {
                orderService.remove(item.id).then(function () {
                    $rootScope.$state.reload();
                }, function (err) {

                });
            }
        }]).controller('complain', ['$scope', 'complainService', '$rootScope',
        function ($scope, complainService, $rootScope) {
            //我的投诉
            $scope.complainStatuses = complainTypes;
            $scope.complainReason = complainReasonTypes;
            $scope.find = function (arr, type) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].value == type) {
                        return arr[i].name;
                    }
                }
                return '其他';
            };
            $scope.complainStatus = $rootScope.$stateParams.complain_status;
            complainService.list($rootScope.$stateParams.complain_status, ($rootScope.$stateParams.page - 1) * 10, 10).then(function (res) {
                $scope.pager = {
                    pageSize: 10,
                    startIndex: $rootScope.$stateParams.page,
                    total: res.total
                };
                $scope.list = res ? res.list : [];
                $scope.list.forEach(function (item) {
                    complainService.detail(item.id).then(function (res) {
                        item = $.extend(item, res);
                    }, function (err) {

                    });
                });
            }, function (err) {

            });
            $scope.change = function (page) {
                $rootScope.$state.go('my/complain', {
                    page: page,
                    complain_status: $scope.orderStatus
                });
            };
            $scope.remove = function (item) {
                complainService.remove(item.id).then(function () {
                    $rootScope.$state.reload();
                }, function (err) {

                });
            }
        }]).controller('score', ['$scope', 'memberService', '$state',
        function ($scope, memberService, $state) {
            //我的积分
            $scope.buttonText == '积分商城购物';
            memberService.score().then(function (res) {
                $scope.list = res.integralList;
            }, function (err) {
                if (err.responseCode == '800005') {
                    $scope.buttonText = '去绑卡';
                }
            });
            $scope.link = function () {
                if ($scope.buttonText == '去绑卡') {
                    $state.go('my/bankCard');
                }
            }
        }]).controller('redPacket', ['$scope', 'memberService', '$rootScope',
        function ($scope, memberService, $rootScope) {
            //我的红包
            $scope.statuses = redPacketStatus;
            memberService.redPackets($rootScope.$stateParams.packet_status, ($rootScope.$stateParams.page - 1) * 6, 6).then(function (res) {
                $scope.pager = {
                    pageSize: 6,
                    startIndex: $rootScope.$stateParams.page,
                    total: res.total
                };
                $scope.list = res.list ? res.list : [];
            }, function (err) {

            });
            $scope.change = function (page) {
                $rootScope.$state.go('my/redPacket', {
                    page: page,
                    packet_status: $rootScope.$stateParams.packet_status
                });
            };
        }]).controller('coupon', ['$scope', 'memberService', '$rootScope',
        function ($scope, memberService, $rootScope) {
            //我的优惠券
            $scope.statuses = couponStatus;
            memberService.coupons($rootScope.$stateParams.coupon_status, ($rootScope.$stateParams.page - 1) * 8, 8).then(function (res) {
                $scope.pager = {
                    pageSize: 8,
                    startIndex: $rootScope.$stateParams.page,
                    total: res.total
                };
                $scope.list = res.list ? res.list : [];
            }, function (err) {

            });
            $scope.change = function (page) {
                $rootScope.$state.go('my/coupon', {
                    page: page,
                    coupon_status: $rootScope.$stateParams.coupon_status
                });
            };
        }]).controller('bankCard', ['$scope', 'cardService',
        function ($scope, cardService) {
            //我的银行卡

        }]).controller('refund', ['$scope', 'refundService', '$rootScope',
        function ($scope, refundService, $rootScope) {
            //申请退款 我的退款
            $scope.refundStatuses = refundStatuses;
            $scope.refundStatus = $rootScope.$stateParams.refund_status;
            refundService.list($rootScope.$stateParams.refund_status, ($rootScope.$stateParams.page - 1) * 10, 10).then(function (res) {
                $scope.pager = {
                    pageSize: 10,
                    startIndex: $rootScope.$stateParams.page,
                    total: res.total
                };
                $scope.list = res ? res.list.map(function (item) {
                    var arr = item.operationDesc.split(',');
                    item.operations = [];
                    arr.forEach(function (e) {
                        if (e) {
                            item.operations.push({
                                name: e
                            });
                        }
                    });
                    return item;
                }) : [];
            }, function (err) {

            });
            $scope.change = function (page) {
                $rootScope.$state.go('my/refundList', {
                    page: page,
                    refund_status: $scope.refundStatus
                });
            };
            $scope.remove = function (item) {
                refundService.remove(item.id).then(function () {
                    $rootScope.$state.reload();
                }, function (err) {

                });
            }
        }]).controller('comment', ['$scope', 'memberService',
        function ($scope, memberService) {
            //评价
        }]).controller('message', ['$scope', 'messageService', '$rootScope',
        function ($scope, messageService, $rootScope) {
            //我的消息
            $scope.messageTypes = messageTypes;
            messageService.list($rootScope.$stateParams.type, ($rootScope.$stateParams.page - 1) * 10, 10).then(function (res) {
                $scope.pager = {
                    pageSize: 10,
                    startIndex: $rootScope.$stateParams.page,
                    total: res ? res.total : 0
                };
                $scope.list = res ? res.list : [];
            }, function (err) {

            });
            $scope.change = function (page) {
                $rootScope.$state.go('my/message', {
                    page: page,
                    type: $rootScope.$stateParams.type
                });
            };
            $scope.remove = function (item) {
                messageService.remove(item.id).then(function () {
                    $rootScope.$state.reload();
                }, function (err) {

                });
            }
        }]);
});