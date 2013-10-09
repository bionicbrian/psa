"use strict";

module.exports = function joinCtrl($scope, $location, Stack, Local) {
    $scope.name = "";
    $scope.passphrase = Stack.passphrase || "";

    $scope.join = function () {
        if ($scope.name && $scope.passphrase && Stack.title) {
            Local.create(Stack.title, $scope.passphrase, $scope.name);
            Stack.members.push({ name: $scope.name });
            $location.path("/stack");
        }
    };
};
