define(function (require, exports, module) {

    var constants = {
        apiUri: 'http://121.43.178.103:8888/o2o-api/',
        $action: function (url) {
            return 'controllers/' + url;
        },
        $template: function (url) {
            return 'app/views/' + url + '.html';
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