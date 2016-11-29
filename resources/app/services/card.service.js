define(function (require, exports, module) {
    var angular = require('angular');

    var ngModule = angular.module('card.service', []);

    ngModule.factory('cardService', ['$request', '$cookie', function ($request, $cookie) {
        return {
            /**获取已绑定银行卡列表*/
            getBindCardList: function () {
                return $request.get('user/queryBoundCard')
            },
            /**发送手机验证码*/
            sendVerify: function (mobile, type) {
                return $request.post('verify', {
                    mobile: mobile,
                    type: type
                })
            },
            /**密码校验*/
            validateCardPwd: function (params) {
                return $request.get('user/validateCardPwd', {
                    crdNo: params.crdNo,
                    pwd: params.pwd,
                    crdType: params.crdType,
                    clientRandom: params.clientRandom,
                    resvFld: params.resvFld,
                    sumry: params.sumry
                });
            },
            /**根据账号卡号查询是否已有支付平台登录名 返回registered = 0 未注册支付账号  1已注册支付账号*/
            queryRegisterAccount: function (crdNo, crdType) {
                return $request.get('user/queryRegisterAccount', {
                    crdNo: crdNo,
                    crdType: crdType
                });
            },
            /**注册支付平台登录名以及绑定借记卡/贷记卡，并开通快捷支付*/
            loginAndBindAccount: function (params) {
                return $request.post('user/loginAndBindAccount', {
                    acctLoginName: params.acctLoginName,
                    acctNo: params.acctNo,
                    acctType: params.acctType,
                    efctvDt: params.efctvDt,
                    cardCvn: params.cardCvn,
                    phn: params.phn,
                    bindFlag: params.bindFlag
                });
            },
            /**注册支付平台登录名以及绑定借记卡/贷记卡，并开通快捷支付*/
            registerAndBindAccount: function (params) {
                return $request.post('user/registerAndBindAccount', {
                    phn: params.phn,//预留手机号
                    acctLoginName: params.acctLoginName,
                    loginPwd: params.loginPwd,
                    resvFld: params.resvFld,//24位随机码
                    acctNo: params.acctNo,//卡号
                    acctType: params.acctType,//卡类型 "1"位借记卡 "D"位信用卡
                    payPwd: params.payPwd,//支付密码密文
                    signMsg: params.signMsg,//200位支付密码随机因子
                    efctvDt: params.efctvDt,//有效日期 信用卡专属
                    cardCvn: params.cardCvn,//CVN2 信用卡专属
                    sumry: "",
                    num: ""//32位随机码,移动端传空即可
//        params1.loginPwd = loginPwd;//登入密码密文
//        params1.sumry = sumry;//200位登录密码随机因子
                });
            },
            /**校验银行卡信息*/
            checkCardInfo: function (params) {
                return $request.get('user/validateCardInfo', {
                    crdNo: params.crdNo,
                    crdType: params.crdType,
                    mobile: params.mobile,
                    custName: params.custName,
                    certNo: params.certNo,
                    efctvDt: params.efctvDt,
                    cardCvv: params.cardCvv
                });
            },
            /**绑定银行卡*/
            bindingCard: function (params) {
                return $request.get('user/bindingCard', {
                    crdNo: params.crdNo,
                    crdType: params.crdType,
                    mobile: params.mobile,
                    verifyCode: params.verifyCode
                });
            },
            //TODO 解除绑定银行卡
            /**解除绑定银行卡*/
            unBindingCard: function (params) {
                return $request.get('user/unbindingCard', {
                    crdNo: params.crdNo,
                    crdType: params.crdType,
                    mobile: params.mobile,
                    verifyCode: params.verifyCode
                });
            }
        }
    }]);


    module.exports = ngModule;
});

