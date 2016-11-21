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
                        .state('my', {
                            url: '/my/',
                            templateUrl: $template('/my/index'),
                            controllerUrl: $action('/my/index'),
                            controller: 'myIndex'
                        })
                        .state('my/collectProduct',{
                            url:'/my/collectProduct',
                            templateUrl:$template('/my/collectProduct'),
                            controllerUrl: $action('/my'),
                            controller: 'collectProduct'
                        })
                        .state('my/addressManage',{
                            url:'/my/addressManage',
                            templateUrl:$template('/my/addressManage'),
                            controllerUrl: $action('/my'),
                            controller: 'collectProduct'
                        });
                }]);

            ngModule.run(['$rootScope', '$timeout', function ($rootScope, $timeout) {
                $rootScope.$on('$stateChangeStart',
                    function (event, toState) {
                        console.log('这里检查参数toState做页面权限验证,用方法event.preventDefault();中断页面跳转');
                    });

            }]);
        }
    };
});