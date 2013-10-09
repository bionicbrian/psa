"use strict";

module.exports = function memberCtrl($scope, Stack) {
    $scope.members = Stack.members;
};