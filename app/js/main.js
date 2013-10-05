"use strict";

var ps = angular.module("phonestacks", []);

function mainCtrl($scope) {
    $scope.inCreateMode = true;
    $scope.inActiveMode = false;
}

// Controllers
var createCtrl = require("./createCtrl");
var stackCtrl = require("./stackCtrl");
var memberCtrl = require("./memberCtrl");

// Bootstrap
ps.controller("MainCtrl", ["$scope", mainCtrl]);
ps.controller("CreateCtrl", ["$scope", createCtrl]);
ps.controller("StackCtrl", ["$scope", stackCtrl]);
ps.controller("MemberCtrl", ["$scope", memberCtrl]);
