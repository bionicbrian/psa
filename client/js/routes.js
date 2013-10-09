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