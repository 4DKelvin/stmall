define(function (require) {
    var app = require('app'),
        image = require('components/image'),
        header = require('components/header'),
        search = require('components/search'),
        footer = require('components/footer'),
        subNav = require('components/subNav'),
        member = require('services/member.service'),
        order = require('services/order.service');

    var orderType = [
        {'value': 0, 'name': '全部订单'},
        {'value': 1, 'name': '待付款'},
        {'value': 2, 'name': '待发货'},
        {'value': 3, 'name': '待收货'},
        {'value': 5, 'name': '待评价'}
    ];

    /** ng异步载入 */
    app.useModule(['image', 'header', 'search', 'footer', 'subNav', 'member.service', 'order.service']);
    app.controller('myIndex', ['$scope', 'memberService', function ($scope, memberService) {
        //我的 首页
    }]).controller('collectProduct', ['$scope', 'memberService', function ($scope, memberService) {
        //我的收藏商品
    }]).controller('collectShop', ['$scope', 'memberService', function ($scope, memberService) {
        //我的收藏店铺
    }]).controller('addressManage', ['$scope', 'memberService', function ($scope, memberService) {
        //我的收货地址
        memberService.addressList(1, 10).then(function (res) {
            $scope.list = res ? res.list : [];
        }, function (err) {

        });
        $scope.setDefault = function (address) {
            memberService.defaultAddress(address.id).then(function (res) {
                $scope.list = $scope.list.map(function (item) {
                    item.default = false;
                });
                address.default = true;
            });
        };
        $scope.remove = function (address) {
            memberService.deleteAddress(address.id).then(function (res) {
                $scope.list.splice($scope.list.indexOf(address), 1);
            });
        };
    }]).controller('orderList', ['$scope', 'orderService', '$rootScope',
        function ($scope, orderService, $rootScope) {
            //我的订单
            $scope.orderTypes = orderType;
            $scope.orderType = $rootScope.$stateParams.order_type;
            orderService.orders($rootScope.$stateParams.order_type, $rootScope.$stateParams.page, 10).then(function (res) {
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
            $scope.remove = function (item) {
                orderService.remove(item.id).then(function () {
                    $rootScope.$state.reload();
                }, function (err) {

                });
            }
        }]).controller('complain', ['$scope', 'memberService', function ($scope, memberService) {
        //我的投诉
    }]).controller('score', ['$scope', 'memberService', function ($scope, memberService) {
        //我的积分
    }]).controller('redPacket', ['$scope', 'memberService', function ($scope, memberService) {
        //我的红包
    }]).controller('coupon', ['$scope', 'memberService', function ($scope, memberService) {
        //我的优惠券
    }]).controller('bankCard', ['$scope', 'memberService', function ($scope, memberService) {
        //我的银行卡
    }]).controller('refund', ['$scope', 'memberService', function ($scope, memberService) {
        //申请退款 我的退款
    }]).controller('comment', ['$scope', 'memberService', function ($scope, memberService) {
        //评价
    }]).controller('message', ['$scope', 'memberService', function ($scope, memberService) {
        //我的消息
    }]);
});