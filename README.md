# PcWeb-Framework

RequireJs + AngularJs  IE >= 8 异步载入框架

### 使用到的模块

* [Angular v1.4 IE 8 Build](https://github.com/fergaldoyle/angular.js-ie8-builds) 使用 `AngularJs 1.4` 版本的 `Ie8 Poly-fills`
* [Angular UI Router v0.3.2](https://github.com/angular-ui/ui-router) 单页路由使用 `UI Router`
* [Angular Async Loader v1.3.2](https://github.com/subchen/angular-async-loader) `Angular` 模块异步加载插件
* [RequireJs v2.3.2](http://requirejs.org) AMD 异步模块定义
* [Jquery v1.11.0](https://github.com/jquery/jquery-dist) `Jquery 1.x` 支持IE6-8的版本
* [Less v2.7.1](http://lesscss.cn/) Less 做Css编译语言
* [IconFont Plus](http://www.iconfont.cn/plus) 设计所有图标由 `IconFont Plus` 管理

### 注意事项

- 使用Angular的`$q`模块创建promise,IE8并不支持`catch`,`finally`等方法

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