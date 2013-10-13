"use strict";

module.exports = function stackCtrl($scope, Stack) {
    $scope.stack = Stack;

    // $scope.refresh = function () {
    //     Stack.get($scope.stack.id).then(function (stack) {
    //         $scope.stack = Stack;
    //         $scope.apply();
    //     });
    // };
};
