"use strict";

var ps = angular.module("phonestacks", []);

ps.factory("Stack", function () {
    return {
        title: "",
        penalty: ""
    };
});


function mainCtrl($scope) { }

// Controllers
var createCtrl = require("./createCtrl");
var joinCtrl = require("./joinCtrl");
var stackCtrl = require("./stackCtrl");
var memberCtrl = require("./memberCtrl");

// Bootstrap
ps.controller("MainCtrl", ["$scope", mainCtrl]);
ps.controller("CreateCtrl", ["$scope", "$location", "Stack", createCtrl]);
ps.controller("JoinCtrl", ["$scope", "Stack", joinCtrl]);
ps.controller("StackCtrl", ["$scope", "Stack", stackCtrl]);
ps.controller("MemberCtrl", ["$scope", memberCtrl]);

var routes = require("./routes");
routes(ps);
