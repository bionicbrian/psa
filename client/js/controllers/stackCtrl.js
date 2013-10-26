"use strict";

module.exports = function stackCtrl($scope, StackRes) {
    $scope.stack = StackRes.stack;

    // function loadStack() {
    //     $http.get("/stack.json").then(function (res) {
    //         $scope.stack = res.data;
    //     });
    // }

    // loadStack();
};
