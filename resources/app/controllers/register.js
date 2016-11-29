define(function (require) {
    var app = require('app'),
        image = require('components/image'),
        header = require('components/header'),
        footer = require('components/footer');

    /** ng异步载入 */
    app.useModule(['image', 'header', 'footer']);

    app.controller('register', ['$scope', function ($scope) {

    }]);

});