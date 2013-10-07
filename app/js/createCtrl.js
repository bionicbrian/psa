"use strict";

module.exports = function createCtrl($scope, $location, Stack) {
    $scope.stack = Stack;

    $scope.create = function () {
        $location.path("/stack");
    };
};
