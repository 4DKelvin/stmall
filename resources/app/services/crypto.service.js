define(function (require, exports, module) {
    var angular = require('angular'),
        $ = require('jquery'),
        CryptoJS = require('cryptojs.core');

    require('cryptojs.md5');
    require('cryptojs.aes');
    require('cryptojs.pad');
    require('cryptojs.mode');

    var ngModule = angular.module('crypto.service', []);

    ngModule.factory('AES', function () {
        return {
            encrypt: function (text) {
                var key = CryptoJS.enc.Utf8.parse("/Mrglo2o=encrypt");
                var iv = "";
                var encrypted = CryptoJS.AES.encrypt(text, key, {
                    iv: iv,
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7,
                    format: CryptoJS.format.OpenSSL
                });
                return encrypted.toString();
            }
        }
    });

    module.exports = ngModule;
});