"use strict";

module.exports = function createCtrl($scope, $location, Stack) {
    $scope.stack = Stack;

    $scope.create = function () {
        Stack.passphrase = "big red panda";
        $location.path("/join");
    };
};
