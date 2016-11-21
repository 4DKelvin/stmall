define(function (require) {
    var app = require('app'),
        image = require('components/image'),
        header = require('components/header'),
        search = require('components/search'),
        footer = require('components/footer'),
        service = require('services/home.service');

    /** ng异步载入 */
    app.useModule('image');

    app.useModule('header');

    app.useModule('search');

    app.useModule('footer');

    app.controller('myIndex', ['$scope', function ($scope) {

    }]);
});
