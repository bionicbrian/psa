"use strict";

module.exports = function createCtrl($scope, $location, StackRes) {
    $scope.title = "";
    $scope.penalty = "";
    $scope.errorMessage = "";

    $scope.create = function () {
        if ($scope.title && $scope.penalty) {
            $scope.errorMessage = "";
            StackRes.create($scope.title, $scope.penalty)
                .then(function () {
                    $location.path("/join");
                });
        } else {
            $scope.errorMessage = "Please provide a title and penalty";
        }
    };
};
