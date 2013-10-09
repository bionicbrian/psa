"use strict";

var ps = angular.module("phonestacks", []);

var mainCtrl = require("./controllers/mainCtrl");
var createCtrl = require("./controllers/createCtrl");
var joinCtrl = require("./controllers/joinCtrl");
var stackCtrl = require("./controllers/stackCtrl");
var memberCtrl = require("./controllers/memberCtrl");

var StackResource = require("./providers/stackResource");
var LocalResource = require("./providers/localResource");

// Add providers
StackResource(ps);
LocalResource(ps);

// Bootstrap controllers
ps.controller("MainCtrl", ["$scope", "$location", "Stack", "Local", mainCtrl]);
ps.controller("CreateCtrl", ["$scope", "$location", "Stack", createCtrl]);
ps.controller("JoinCtrl", ["$scope", "$location", "Stack", "Local", joinCtrl]);
ps.controller("StackCtrl", ["$scope", "Stack", stackCtrl]);
ps.controller("MemberCtrl", ["$scope", "Stack", memberCtrl]);

// Configure routes
var routes = require("./routes");
routes(ps);
