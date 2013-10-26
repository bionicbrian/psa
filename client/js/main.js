"use strict";

var ps = angular.module("phonestacks", []);

var mainCtrl = require("./controllers/mainCtrl");
var createCtrl = require("./controllers/createCtrl");
var joinCtrl = require("./controllers/joinCtrl");
var stackCtrl = require("./controllers/stackCtrl");

var StackResource = require("./providers/stackResource");
var LocalResource = require("./providers/localResource");

// Add providers
StackResource(ps);
LocalResource(ps);

// Bootstrap controllers
ps.controller("MainCtrl", ["$scope", "$location", "StackRes", "Local", mainCtrl]);
ps.controller("CreateCtrl", ["$scope", "$location", "StackRes", createCtrl]);
ps.controller("JoinCtrl", ["$scope", "$location", "StackRes", "Local", joinCtrl]);
ps.controller("StackCtrl", ["$scope", "StackRes", stackCtrl]);

// Configure routes
var routes = require("./routes");
routes(ps);
