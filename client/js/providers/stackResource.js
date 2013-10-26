"use strict";

module.exports = function StackResource(app) {
    app.factory("StackRes", ["$http", "$q", function ($http, $q) {
        var that = this;

        that.stack = {};
        that.currentMember = {};

        function updateStack (res) {
            that.stack = res.data;
            return $q.when(that.stack);
        }

        that.clear = function () {
            that.stack = {};
        };

        // that.refresh = function () {
        //     return $http.get("api/stack/" + stack._id);
        // };

        // that.updateMember = function (memberId) {
        //     return $http.post("api/stack/" + stack._id + "/members/" + memberId);
        // };

        that.create = function (title, penalty) {
            // return $http.get("stack.json").then(updateStack);
            var data = {
                title: title,
                penalty: penalty
            };
            return $http.post("/stack", data).then(updateStack);
        };

        that.join = function (name) {
            if (that.stack._id && that.stack.passphrase) {
                var data = {
                    passphrase: that.stack.passphrase,
                    name: name
                };

                return $http.post("/join", data)
                    .then(function (res) {
                        that.stack = res.data.stack;
                        that.currentMember = res.data.member;
                    });
            }
        };

        that.rejoin = function (passphrase, name) {
            // AJAX request here
            that.stack.title = "Mock title";
            that.stack.penalty = "Buy a round";
            that.stack.passphrase = passphrase;
            that.stack.members.push({ name: name });
        };

        return that;
    }]);
};
