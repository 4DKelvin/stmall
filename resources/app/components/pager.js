define(function (require, exports, module) {
    var angular = require('angular'),
        $ = require('jquery');

    var ngModule = angular.module('pager', []);

    document.createElement('pager');

    ngModule.directive('pager', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            template: '<div class="pager-wrap">' +
                '<a ng-click="ngChange({page:1})" ng-if="index>3">1</a>' +
                '<span ng-if="index>3">...</span>' +
                '<a ng-click="ngChange({page:page.value})" ng-class="{\'active\':page.active}" ng-repeat="page in pages" ng-bind="page.value"></a>' +
                '<span ng-if="index<=len-3">...</span>' +
                '<a ng-click="ngChange({page:len})" ng-if="index<=len-3" ng-bind="len"></a>' +
            '</div>',
            scope: {
                ngModel: '=?',
                ngChange: '&ngChange'
            },
            controller: function ($scope, $element, $attrs) {
                $scope.pages = [];
                $scope.$watch('ngModel', function () {
                    $scope.len = Math.ceil($scope.ngModel.total / $scope.ngModel.pageSize);
                    $scope.index = Math.ceil($scope.ngModel.startIndex / $scope.ngModel.pageSize);
                    for (var i = ($scope.index - 2 > 0 ? $scope.index - 2 : 1); i <= ($scope.index + 2 <= $scope.len ? $scope.index + 2 : $scope.len); i++) {
                        $scope.pages.push({
                            active: i == $scope.index,
                            value: i
                        });
                    }
                });

            }
        }
    }]);

    module.exports = ngModule;
});