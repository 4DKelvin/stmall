define(function (require) {
    var app = require('app'),
        image = require('components/image'),
        header = require('components/header'),
        search = require('components/search'),
        footer = require('components/footer'),
        product = require('services/product.service');

    var sortTypes = [
        {name: '综合', value: '0'},
        {name: '人气', value: '1'},
        {name: '评价', value: '2'},
        {name: '销量', value: '3'},
        {name: '价格', value: '4'}
    ];

    /** ng异步载入 */
    app.useModule(['image', 'header', 'search', 'footer', 'product.service']);

    app.controller('productDetail', ['$scope', 'productService', function ($scope, productService) {

    }]).controller('productList', ['$scope', 'productService', '$rootScope', function ($scope, productService, $rootScope) {
        $scope.selectedCates = [];
        $scope.sortTypes = sortTypes;
        $scope.keyword = $rootScope.$stateParams.keyword;
        $scope.pager = {
            pageSize: 20,
            startIndex: $rootScope.$stateParams.page,
            total: 0
        };
        productService.products({
            cateIds: $rootScope.$stateParams.cate > 0 ? $rootScope.$stateParams.cate : "",        //分类id string
            shopCatId: "",      //店铺分类id  string
            promotion: "",      //促销（限时抢购-1，团购-3，秒杀-4，预售-advance）
            longitude: 0,      //经度
            latitude: 0,       //纬度
            distance: 0,       //距离
            productType: "2",    //商品类型 1-服务类 2-实物类
            specialType: "",    //酒店或旅游(TRAVEL_PRODUCT_CATEGORY 为旅游类商品 HOTEL_PRODUCT_CATEGORY 为酒店类商品)
            shopId: "",         //店铺id
            shopTags: "",       //店铺标签（使用|@|分隔）（1-财富联盟商户  2-联盟优选商户（已删除） 3-桂银精选商户  4-爱心扶贫商户）
            sortType: "score-desc",       //排序条件（score-desc|@|soldNum-desc|@|collections-desc|distance-asc|price-asc|publishTime-asc）
            keyword: $scope.keyword,        //关键字
            startIndex: $scope.pager.startIndex,     //开始下标(0开始)
            count: $scope.pager.pageSize           //数量
        }).then(function (res) {
            $scope.pager.total = res ? res.total : 0;
            $scope.list = res ? res.list : [];
        }, function (err) {

        });
        productService.categories().then(function (res) {
            $scope.categories = res.list;
            $scope.categories.forEach(function (root) {
                if (root.id == $rootScope.$stateParams.cate) {
                    $scope.selectedCates = [root];
                    return false;
                }
                if (root.items) {
                    root.items.forEach(function (cate) {
                        if (cate.id == $rootScope.$stateParams.cate) {
                            $scope.selectedCates = [root, cate];
                            return false;
                        }
                        if (cate.items) {
                            cate.items.forEach(function (child) {
                                if (child.id == $rootScope.$stateParams.cate) {
                                    $scope.selectedCates = [root, cate, child];
                                    return false;
                                }
                            });
                        }
                    });
                }
            })
        }, function (err) {
        });


    }]);

});