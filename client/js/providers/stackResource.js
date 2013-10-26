"use strict";

module.exports = function StackResource(app) {
    app.factory("StackRes", ["$http", "$q", function ($http, $q) {
        var that = this;

        var stack = {
            title: "",
            penalty: "",
            members: []
        };

        that.clear = function () {
            stack.title = "";
            stack.penalty = "";
            stack.members = [];
        };

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
        that.rejoin = function (passphrase, name) {
            // AJAX request here
            stack.title = "Mock title";
            stack.penalty = "Buy a round";
            stack.passphrase = passphrase;
            stack.members.push({ name: name });
        };

        that.create = function (title, penalty) {
            return $http.get("stack.json").then(function (res) {
                stack = res.data;
            });
        };

        that.addMember = function (name) {
            var deferred = $q.defer();
            setTimeout(function () {
                stack.members.push({ "name" : name });
                deferred.resolve();
            }, 100);
            return deferred.promise;
        };

        that.stack = stack;
        return that;
    }]);
};
