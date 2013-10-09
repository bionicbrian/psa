"use strict";

module.exports = function mainCtrl($scope, $location, Stack, Local) {
    if (Local.name) {
        $scope.name = Local.name;
        $scope.title = Local.title;
        $scope.passphrase = Local.passphrase;
    }

    $scope.rejoin = function () {
        Stack.rejoin($scope.passphrase, $scope.name);
        $location.path("/stack");
    }
};