define(function (require, exports, module) {
    var app = require('app');

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                // new attribute for ajax load controller
                controllerUrl: 'home',
                controller: 'home'
            });
    }]);
});