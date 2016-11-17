# Pc-Web-Framework

RequireJs + AngularJs  IE >= 8 异步载入框架

### 使用到的模块

* [Angular v1.4 IE 8 Build](https://github.com/fergaldoyle/angular.js-ie8-builds) 使用 `AngularJs 1.4` 版本的 `Ie8 Poly-fills`
* [Angular UI Router v0.3.2](https://github.com/angular-ui/ui-router) 单页路由使用 `UI Router`
* [Angular Async Loader v1.3.2](https://github.com/subchen/angular-async-loader) `Angular` 模块异步加载插件
* [RequireJs v2.3.2](http://requirejs.org) AMD 异步模块定义
* [Jquery v1.11.0](https://github.com/jquery/jquery-dist) `Jquery 1.x` 支持IE6-8的版本
* [Less v2.7.1](http://lesscss.cn/) Less 做Css编译语言
* [IconFont Plus](http://www.iconfont.cn/plus) 设计所有图标由 `IconFont Plus` 管理
* [Gulp v3.9.1](http://www.gulpjs.com.cn/) 前端自动化构建使用`Gulp` 管理资源合并压缩
* [MockJs v1.0.1](https://github.com/nuysoft/Mock) 模拟Restful(Ajax) 请求数据

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

### 自动整合 `RAP Mock Api`
- `RAP` [接口文档](http://121.43.161.157:8084/workspace/myWorkspace.do?projectId=3#219)
- 已集成MockApi(仅开发模式)
````
<script src='http://121.43.161.157:8084/rap.plugin.js?projectId=3'></script>

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
- 更多`规范`看[这里](https://github.com/amdjs/amdjs-api/wiki/AMD)

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

### 使用协议

MIT License