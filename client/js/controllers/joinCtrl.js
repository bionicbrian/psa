"use strict";

module.exports = function joinCtrl($scope, $location, StackRes, Local) {
    $scope.name = "";
    $scope.passphrase = StackRes.stack.passphrase || "";
    $scope.errorMessage = "";

    $scope.join = function () {
        if ($scope.name && $scope.passphrase) {
            $scope.errorMessage = "";
            StackRes.join($scope.name).then(function () {
                Local.create(StackRes.stack.title, $scope.passphrase, $scope.name);
                $location.path("/stack");
            });
        } else {
            $scope.errorMessage = "Please provide a valid name and passphrase.";
        }
    };
};
