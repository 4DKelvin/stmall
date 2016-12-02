define(function (require) {
    var app = require('app'),
        geetest = require('geetest'),
        registerService = require('services/register.service');

    /** ng异步载入 */
    app.useModule(['register.service']);

    app.controller('register', ['$scope','$request','$timeout', 'registerService', function ($scope,$request,$timeout, registerService) {
        $scope.step = 'first';
        // $scope.result = 'failed';
        //极验预处理
        registerService.preProcess().then(
            function(data){
                console.log(data);
                initGeetest({
                    gt: data.gt,
                    challenge: data.challenge,
                    product: "float",
                    offline: !data.success,
                    staticservers: ["statictest.geetest.com/"]
                }, handlerEmbed);
            }
        );
        var handlerEmbed = function (captchaObj) {
            $timeout(function(){
                captchaObj.appendTo("#float-captcha");
                captchaObj.onReady(function () {
                    $("#wait")[0].className = "hide";
                });
            });
        };

    }]);

});