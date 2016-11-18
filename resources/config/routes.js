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
                        });
                }]);

            ngModule.run(['$rootScope', function ($rootScope) {
                $rootScope.$on('$stateChangeStart',
                    function (event, toState) {
                        console.log('这里检查参数toState做页面权限验证,用方法event.preventDefault();中断页面跳转');
                    });

            }]);
        }
    };
});