"use strict";

module.exports = function helloCtrl($scope) {
    $scope.name = "Brian";
    setTimeout(function () {
        $scope.name = "Someone else";
    }, 5000);
};