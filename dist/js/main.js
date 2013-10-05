;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = function createCtrl($scope) {

};
},{}],2:[function(require,module,exports){
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

},{"./createCtrl":1,"./memberCtrl":3,"./stackCtrl":4}],3:[function(require,module,exports){
"use strict";

module.exports = function memberCtrl($scope) {
    $scope.members = [
        { name: "Brian" },
        { name: "Rebecca" }
    ];
};
},{}],4:[function(require,module,exports){
"use strict";

module.exports = function stackCtrl($scope) {
    $scope.title = "Congrats Brian";
};
},{}]},{},[2])
;