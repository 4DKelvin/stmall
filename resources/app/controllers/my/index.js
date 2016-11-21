define(function (require) {
    var app = require('app'),
        image = require('components/image'),
        header = require('components/header'),
        search = require('components/search'),
        footer = require('components/footer');

    /** ng异步载入 */
    app.useModule(['image', 'header', 'search', 'footer']);
    app.controller('myIndex', ['$scope', function ($scope) {

    }]);
});
