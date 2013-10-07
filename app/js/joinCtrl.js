"use strict";

module.exports = function joinCtrl($scope, $location, Stack) {
    $scope.name = "";

    $scope.join = function () {
        if ($scope.name) {
            Stack.members.push({ name: $scope.name });
            $location.path("/stack");
        }
    };
};
