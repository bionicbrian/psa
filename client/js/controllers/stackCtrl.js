"use strict";

module.exports = function stackCtrl($scope, StackRes) {
    $scope.stack = StackRes.stack;

    $scope.checkIn = StackRes.checkIn;
    $scope.checkOut = StackRes.checkOut;

    $scope.isInactive = function () {
        return !StackRes.currentMember.inStack;
    };
};
