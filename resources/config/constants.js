define(function (require, exports, module) {
    var $ = require('jquery'),
        cookie = require('cookie');

    var constants = {
        apiUri: 'http://121.43.178.103:8888/o2o-api/',
        $action: function (url) {
            return 'controllers/' + url;
        },
        $template: function (url) {
            return 'app/views/' + url + '.html';
        },
        $cookie: function (key, value) {
            if (value) {
                $.cookie(key, JSON.stringify(value));
            } else {
                return $.cookie(key)?$.parseJSON($.cookie(key)):false;
            }
        },
        $removeCookie: function (key) {
            $.removeCookie(key);
        }
    };

    module.exports = {
        regConstants: function (ngModule) {
            for (var key in constants) {
                ngModule.constant(key, constants[key]);
            }
        }
    };
});