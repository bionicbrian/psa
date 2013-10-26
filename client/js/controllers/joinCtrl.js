"use strict";

module.exports = function joinCtrl($scope, $location, StackRes, Local) {
    $scope.name = "";
    $scope.passphrase = StackRes.stack.passphrase || "";

    $scope.join = function () {
        if ($scope.name && $scope.passphrase && StackRes.stack.title) {
            StackRes.join($scope.name).then(function () {
                Local.create(StackRes.stack.title, $scope.passphrase, $scope.name);
                $location.path("/stack");
            });
        }
    };
};
