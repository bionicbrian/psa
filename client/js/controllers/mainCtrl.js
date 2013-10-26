"use strict";

module.exports = function mainCtrl($scope, $location, StackRes, Local) {
    StackRes.clear();

    if (Local.name) {
        $scope.name = Local.name;
        $scope.title = Local.title;
        $scope.passphrase = Local.passphrase;
    }

    $scope.rejoin = function () {
        StackRes.rejoin($scope.passphrase, $scope.name);
        $location.path("/stack");
    }
};