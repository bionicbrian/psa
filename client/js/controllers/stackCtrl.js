"use strict";

module.exports = function stackCtrl($scope, Stack) {
    $scope.stack = {};

    Stack.create().then(function (res) {
        $scope.stack = res.data;
    });

    // $scope.refresh = function () {
    //     Stack.get($scope.stack.id).then(function (stack) {
    //         $scope.stack = Stack;
    //         $scope.apply();
    //     });
    // };
};
