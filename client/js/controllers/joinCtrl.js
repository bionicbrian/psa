"use strict";

module.exports = function joinCtrl($scope, $location, StackRes, Local) {
    $scope.name = "";
    $scope.passphrase = StackRes.stack.passphrase || "";
    $scope.phoneNumber = "";
    $scope.serviceProviders = [
        { name:"AT&T", code:"att" },
        { name:"Verizon", code:"verizon" }
    ];
    $scope.serviceProvider = {};

    $scope.errorMessage = "";

    $scope.join = function () {
        if ($scope.name && $scope.passphrase) {
            $scope.errorMessage = "";
            StackRes.join($scope.name, $scope.passphrase,
                          $scope.phoneNumber, $scope.serviceProvider.code)
                .then(function () {
                    Local.create(StackRes.stack.title, $scope.passphrase, $scope.name);
                    $location.path("/stack");
                }, function (err) {
                    $scope.errorMessage = err.message;
                });
        } else {
            $scope.errorMessage = "Please provide a valid name and passphrase.";
        }
    };
};
