;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = function createCtrl($scope, $location, Stack) {
    $scope.stack = Stack;

    $scope.create = function () {
        Stack.passphrase = "big red panda";
        $location.path("/join");
    };
};

},{}],2:[function(require,module,exports){
"use strict";

module.exports = function joinCtrl($scope, $location, Stack, Local) {
    $scope.name = "";
    $scope.passphrase = Stack.passphrase || "";

    $scope.join = function () {
        if ($scope.name && $scope.passphrase && Stack.title) {
            Local.create(Stack.title, $scope.passphrase, $scope.name);
            Stack.members.push({ name: $scope.name });
            $location.path("/stack");
        }
    };
};

},{}],3:[function(require,module,exports){
"use strict";

module.exports = function mainCtrl($scope, $location, Stack, Local) {
    if (Local.name) {
        $scope.name = Local.name;
        $scope.title = Local.title;
        $scope.passphrase = Local.passphrase;
    }

    $scope.rejoin = function () {
        Stack.rejoin($scope.passphrase, $scope.name);
        $location.path("/stack");
    }
};
},{}],4:[function(require,module,exports){
"use strict";

module.exports = function memberCtrl($scope, Stack) {
    $scope.members = Stack.members;
};
},{}],5:[function(require,module,exports){
"use strict";

module.exports = function stackCtrl($scope, Stack) {
    $scope.stack = Stack;

    // $scope.refresh = function () {
    //     Stack.get($scope.stack.id).then(function (stack) {
    //         $scope.stack = Stack;
    //         $scope.apply();
    //     });
    // };
};

},{}],6:[function(require,module,exports){
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

},{"./controllers/createCtrl":1,"./controllers/joinCtrl":2,"./controllers/mainCtrl":3,"./controllers/memberCtrl":4,"./controllers/stackCtrl":5,"./providers/localResource":7,"./providers/stackResource":8,"./routes":9}],7:[function(require,module,exports){
"use strict";

module.exports = function LocalResource(app) {
    app.factory("Local", function () {
        var local = {};

        if (window.localStorage) {
            local.title = window.localStorage.title;
            local.passphrase = window.localStorage.passphrase;
            local.name = window.localStorage.name;
        }

        local.create = function (title, passphrase, name) {
            window.localStorage.title = title;
            window.localStorage.passphrase = passphrase;
            window.localStorage.name = name;
        };

        return local;
    });
};

},{}],8:[function(require,module,exports){
"use strict";

module.exports = function StackResource(app) {
    app.factory("Stack", function ($http) {
        var stack = {
            title: "",
            penalty: "",
            members: []
        };

        // stack.create = function (data) {
        //     return $http.post("api/stack/", data);
        // };

        // stack.join = function (id, data) {
        //     return $http.post("api/stack/" + id + "/members", data);
        // };

        // stack.get = function (id) {
        //     return $http.get("api/stack/" + id);
        // };

        // stack.updateMember = function (stackId, memberId) {
        //     return $http.post("api/stack/" + stackId + "/members/" + memberId);
        // };

        // 2 PLACEHOLDER METHODS:
        stack.rejoin = function (passphrase, name) {
            // AJAX request here
            stack.title = "Mock title";
            stack.penalty = "Buy a round";
            stack.passphrase = passphrase;
            stack.members.push({ name: name });
        };

        stack.create = function (title, penalty) {
            // AJAX request here
            stack.title = title;
            stack.penalty = penalty;
        };

        return stack;
    });
};

},{}],9:[function(require,module,exports){
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
},{}]},{},[6])
;