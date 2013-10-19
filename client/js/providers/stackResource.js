"use strict";

module.exports = function StackResource(app) {
    app.factory("Stack", ["$http", function ($http) {
        var stack = {
            title: "",
            penalty: "",
            members: []
        };

        stack.clear = function () {
            stack.title = "";
            stack.penalty = "";
            stack.members = [];
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
            return $http.get("stack.json");
        };

        return stack;
    }]);
};
