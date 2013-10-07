"use strict";

var ps = angular.module("phonestacks", []);

function mainCtrl($scope) {

}

// Controllers
var createCtrl = require("./createCtrl");
var joinCtrl = require("./joinCtrl");
var stackCtrl = require("./stackCtrl");
var memberCtrl = require("./memberCtrl");

// Bootstrap
ps.controller("MainCtrl", ["$scope", mainCtrl]);
ps.controller("JoinCtrl", ["$scope", joinCtrl]);
ps.controller("CreateCtrl", ["$scope", createCtrl]);
ps.controller("StackCtrl", ["$scope", stackCtrl]);
ps.controller("MemberCtrl", ["$scope", memberCtrl]);

var routes = require("./routes");
routes(ps);
