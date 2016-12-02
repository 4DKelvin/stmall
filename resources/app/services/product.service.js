define(function (require, exports, module) {
    var angular = require('angular');

    var ngModule = angular.module('product.service', []);

    ngModule.factory('productService', ['$request', '$q', function ($request, $q) {
        return {
            categories: function () {
                var deferred = $q.defer(),
                    result = {},
                    find = function (arr, id) {
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i].id == id) {
                                //二级分类
                                return arr[i];
                            } else if (arr[i].items) {
                                for (var j = 0; j < arr[i].items.length; j++) {
                                    if (arr[i].items[j].id == id) {
                                        //三级分类
                                        return arr[i].items[j];
                                    }
                                }
                            }
                        }
                        return false;
                    };
                $request.get('cates', {}).then(function (res) {
                    result.list = [];
                    res.data.forEach(function (e) {
                        if (!e.parentId) {
                            result.list.push(e);
                        } else {
                            var parent = find(result.list, e.parentId);
                            if (parent) {
                                parent.items = parent.items ? parent.items : [];
                                parent.items.push(e);
                            }
                        }
                    });
                    deferred.resolve(result);
                }, function (err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            },
            products: function (params) {
                return $request.post('products', params);
            }
        }
    }]);

    module.exports = ngModule;
});

