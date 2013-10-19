"use strict";

module.exports = function stackCtrl($scope, Stack) {
    $scope.stack = {};

    Stack.create().then(function (res) {
        $scope.stack = res.data;
    });
};
