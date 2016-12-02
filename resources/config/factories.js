define(function (require, exports, module) {
    var $ = require('jquery');
    /** @Inject:mock */
    var factories = {
        /**
         * 请求(继承于$http)
         */
        $request: ['$http', '$q', 'apiUri', '$cookie', '$state', function ($http, $q, apiUri, $cookie, $state) {
            var request = function (path, params, method) {
                var deferred = $q.defer(),
                    profile = $cookie('profile'),
                    token = profile.token,
                    memberId = profile.memberId,
                    data = {_seed: new Date().getTime()};
                if (method == 'GET' || method == 'DELETE') {
                    data = $.extend(data, params);
                } else {
                    data = $.extend(data, {
                        requestData: params
                    });
                }
                if (token) {
                    data.token = token;
                }
                if (memberId) {
                    data.memberId = memberId;
                }
                var options = {
                    url: typeof mock == 'undefined' ? apiUri + path : path,
                    method: method,
                    cache: false
                };
                options[method == 'GET' || method == 'DELETE' ? 'params' : 'data'] = data;
                console.log('[ 请求 ][ ' + options.url + ' ][ ' + options.method + ' ]数据接口,参数:', data);
                try {
                    $http(options).success(function (data) {
                        console.log('[ 响应 ][ ' + options.url + ' ][ ' + options.method + ' ]数据接口,返回:', data);
                        switch (data.responseCode) {
                            case "000000":
                                deferred.resolve(data.responseData);
                                break;
                            case "999999":
                                deferred.resolve({desc: '登录已经失效,请重新登录'});
                                $state.go('login');
                                break;
                            case "210016":
                            case "800005":
                            default :
                                deferred.reject(data);
                                break;
                        }
                    }).error(function (err, status) {
                        deferred.reject({desc: '网络出现问题'});
                    });
                } catch (e) {
                    deferred.reject({desc: '程序出现问题'});
                }
                return deferred.promise;
            };
            return {
                'get': function (path, params) {
                    return request(path, params, 'GET');
                },
                'post': function (path, params) {
                    return request(path, params, 'POST');
                },
                'put': function (path, params) {
                    return request(path, params, 'PUT');
                },
                'delete': function (path, params) {
                    return request(path, params, 'DELETE');
                }
            };
        }],
        $dialog: ['ngDialog', function (ngDialog) {
            return $.extend(ngDialog, {
                $alert: function (message) {
                    ngDialog.open({
                        template: '<p>' + message + '</p>',
                        plain: true
                    });
                }
            });
        }]
    };
    module.exports = {
        regFactories: function (ngModule) {
            for (var key in factories) {
                ngModule.factory(key, factories[key]);
            }
        }
    };
});