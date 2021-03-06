define(function (require, exports, module) {
    var angular = require('angular'),
        $ = require('jquery'),
        unveil = require('unveil');

    var ngModule = angular.module('image', []);

    ngModule.directive('ngLazy', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            scope: {
                ngLazy: '='
            },
            controller: function ($scope, $element, $attrs) {
                $element.attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
                $scope.$watch('ngLazy', function () {
                    $element.attr('data-src', $attrs.ngLazy.indexOf('/') != -1 ? $attrs.ngLazy : $scope.ngLazy);
                    $timeout(function () {
                        $($element).unveil();
                    });
                });
            }
        }
    }]);

    module.exports = ngModule;
});