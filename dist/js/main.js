;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = function goodbye($scope) {
    $scope.name = "Cruel World";
};
},{}],2:[function(require,module,exports){
"use strict";

module.exports = function helloCtrl($scope) {
    $scope.name = "Brian";
    setTimeout(function () {
        $scope.name = "Someone else";
    }, 5000);
};
},{}],3:[function(require,module,exports){
"use strict";

var ps = angular.module("phonestacks", []);

// Controllers
var helloCtrl = require("./helloCtrl");
var goodbyeCtrl = require("./goodbyeCtrl");

// Bootstrap
ps.controller("HelloCtrl", ["$scope", helloCtrl]);
ps.controller("GoodbyeCtrl", ["$scope", goodbyeCtrl]);

},{"./goodbyeCtrl":1,"./helloCtrl":2}]},{},[3])
;