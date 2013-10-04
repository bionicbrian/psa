"use strict";

var something = require("./something");

var ps = angular.module("phonestacks", []);

function helloCtrl($scope) {
    $scope.name = "Brian";
    setTimeout(function () {
        $scope.name = "Someone else";
    }, 5000);
}

ps.controller("HelloCtrl", ["$scope", helloCtrl]);
