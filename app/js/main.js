"use strict";

var ps = angular.module("phonestacks", []);

// Controllers
var helloCtrl = require("./helloCtrl");
var goodbyeCtrl = require("./goodbyeCtrl");

// Bootstrap
ps.controller("HelloCtrl", ["$scope", helloCtrl]);
ps.controller("GoodbyeCtrl", ["$scope", goodbyeCtrl]);
