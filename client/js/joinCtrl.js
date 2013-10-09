"use strict";

module.exports = function joinCtrl($scope, $location, Stack) {
    $scope.name = "";
    $scope.passphrase = Stack.passphrase || "";

    $scope.join = function () {
        if ($scope.name && $scope.passphrase && Stack.title) {
            Stack.members.push({ name: $scope.name });
            $location.path("/stack");
        }
    };
};
