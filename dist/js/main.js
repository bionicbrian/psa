;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = function createCtrl($scope, $location, Stack) {
    $scope.stack = Stack;

    $scope.create = function () {
        $location.path("/stack");
    };
};

},{}],2:[function(require,module,exports){
"use strict";

module.exports = function joinCtrl($scope) {

};

},{}],3:[function(require,module,exports){
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

},{"./createCtrl":1,"./joinCtrl":2,"./memberCtrl":4,"./routes":5,"./stackCtrl":6}],4:[function(require,module,exports){
"use strict";

module.exports = function memberCtrl($scope) {
    $scope.members = [
        { name: "Brian" },
        { name: "Rebecca" }
    ];
};
},{}],5:[function(require,module,exports){
"use strict";

module.exports = function routes(app) {
    app.config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "partials/main.html",
                controller: "MainCtrl"
            })
            .when("/create", {
                templateUrl: "partials/create.html",
                controller: "CreateCtrl"
            })
            .when("/join", {
                templateUrl: "partials/join.html",
                controller: "JoinCtrl"
            })
            .when("/stack", {
                templateUrl: "partials/stack.html",
                controller: "StackCtrl"
            });
    });
};
},{}],6:[function(require,module,exports){
"use strict";

module.exports = function stackCtrl($scope, Stack) {
    $scope.stack = Stack;
};

},{}]},{},[3])
;