# Pc-Web-Framework

RequireJs + AngularJs  IE >= 8 异步载入框架

### 使用到的模块

* [Angular v1.4 IE 8 Build](https://github.com/fergaldoyle/angular.js-ie8-builds) 使用 `AngularJs 1.4` 版本的 `Ie8 Poly-fills`
* [Angular UI Router v0.3.2](https://github.com/angular-ui/ui-router) 单页路由使用 `UI Router`
* [Angular Async Loader v1.3.2](https://github.com/subchen/angular-async-loader) `Angular` 模块异步加载插件
* [RequireJs v2.3.2](http://requirejs.org) AMD 异步模块定义
* [Jquery v1.11.0](https://github.com/jquery/jquery-dist) `Jquery 1.x` 支持IE6-8的版本
* [Jquery unveil v1.3.0](https://github.com/luis-almeida/unveil) 图片延迟加载插件
* [Less v2.7.1](http://lesscss.cn/) Less 做Css编译语言
* [IconFont Plus](http://www.iconfont.cn/plus) 设计所有图标由 `IconFont Plus` 管理
* [Gulp v3.9.1](http://www.gulpjs.com.cn/) 前端自动化构建使用`Gulp` 管理资源合并压缩
* [MockJs v1.0.1](https://github.com/nuysoft/Mock) 模拟Restful(Ajax) 请求数据
* [Es5-shim v4.0.5](https://github.com/es-shims/es5-shim) 让 IE8 支持更多浏览器新特性(`Javascript部分`)

### 自动整合 `RAP Mock Api`
- `RAP` [接口文档](http://121.43.161.157:8084/workspace/myWorkspace.do?projectId=3#219)
- 已集成MockApi(仅开发模式)
````
<script src='http://121.43.161.157:8084/rap.plugin.js?projectId=3'></script>
````

### 打开方式
- 环境准备(`NodeJS` 与 `Npm3` 不同系统安装各异)

- 初始化项目
````
npm install
````
- 安装`Bower`模块和前端插件
````
npm install -g bower && bower install
````
- 运行(开发模式),端口号`4000`[预览](http://localhost:4000/)
````
gulp serve
````
- 发布(dist目录)
````
gulp
````

### 前端模块化
- AMD 方式定义模块 require方式异步引入
````
define(function (require, exports, module) {
    var app = require('app'); //引入模块

    app.controller('home', ['$scope', function ($scope) {

    }]);
    module.exports = app; //输出
});
````
- 入口配置, 将 `Jquery` 和 `Angular` 作用域设置全局
````
require.config({
    baseUrl: '/module',
    paths: {
        'angular': '../lib/angular',
        'angular-ui-router': '../lib/angular-ui-router',
        'angular-async-loader': '../lib/angular-async-loader',
        'jquery': '../lib/jquery',
        'unveil': '../lib/jquery.unveil',
        'app': '../config/app',
        'routes': '../config/routes',
        'image': '../config/image'
    },
    shim: {
        'jquery': {exports: 'jquery'},
        'unveil': {deps: ['jquery']},
        'image': {deps: ['unveil']},
        'angular': {exports: 'angular'},
        'angular-ui-router': {deps: ['angular']}
    }
});
````
- 更多`Angular异步定义`看[这里](https://github.com/subchen/angular-async-loader)
- 更多`AMD规范`看[这里](https://github.com/amdjs/amdjs-api/wiki/AMD)

### 图片延迟加载(Unveil)
- Controller
````
  $scope.image = "http://lorempixel.com/g/800/500/city/1"
````
- View
````
<img ng-lazy="image"/>
````

### 注意事项

- 使用Angular的`$q`模块创建`promise`, IE8 并不支持`catch`,`finally`等方法

````
// 不支持
promise.catch(function(){});

// 正确方式
promise['catch'](function(){});
````
- IE 8 不支持自定义标签
````
// 不支持
<ng-view></ng-view>
// 正确方式
<div ng-view></div>
````
- 自定义指令 使用E方式 IE8 要添加 `document.createElement('');`
````
document.createElement('myElement'); //这个很重要

Module.directive('myElement', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: false,
        template: '...',
        link: function (scope, element, attr) {
            //...
        }
    }
});
````
- 使用 `ng-style` 替代 `style="{{ someCss }}"`
````
// 不支持
<div ng-style='someCss'></div>
// 正确方式
<div style='{{someCss}}'></div>
````
- ...(待补充)

### 使用协议

MIT License