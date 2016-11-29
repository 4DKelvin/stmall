define(function(require){
    var app = require('app'),
        image = require('components/image'),
        header = require('components/header'),
        search = require('components/search'),
        footer = require('components/footer'),
        subNav = require('components/subNav');

    /** ng异步载入 */
    app.useModule(['image', 'header', 'search', 'footer','subNav']);

    app.controller('shopList',['$scope',function($scope){

    }]);

});