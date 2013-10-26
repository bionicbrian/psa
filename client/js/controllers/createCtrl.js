"use strict";

module.exports = function createCtrl($scope, $location, StackRes) {
    $scope.stack = StackRes.stack;

    $scope.create = function () {
        StackRes.create().done(function () {
            StackRes.stack.passphrase = "stack pacckhrase";
            $location.path("/join");
        });
    };
};
