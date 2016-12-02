define(function (require) {
    var app = require('app'),
        image = require('components/image'),
        header = require('components/header'),
        search = require('components/search'),
        footer = require('components/footer'),
        product = require('services/product.service');

    /** ng异步载入 */
    app.useModule(['image', 'header', 'search', 'footer', 'product.service']);

    app.controller('productDetail', ['$scope', 'productService', function ($scope, productService) {

    }]).controller('productList', ['$scope', 'productService', '$rootScope', function ($scope, productService, $rootScope) {
        $scope.selectedCates = [];
        $scope.keyword = $rootScope.$stateParams.keyword;
        productService.categories().then(function (res) {
            $scope.categories = res.list;
            console.log(res.list);
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