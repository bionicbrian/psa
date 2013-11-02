"use strict";

var _ = require("underscore");

module.exports = function StackResource(app) {
    app.factory("StackRes", ["$http", "$q", function ($http, $q) {
        var that = this;

        that.stack = {};
        that.currentMember = {};

        function updateStack (res) {
            that.stack = res.data.stack;
            return $q.when(that.stack);
        }

        that.clear = function () {
            that.stack = {};
        };

        // that.refresh = function () {
        //     return $http.get("api/stack/" + stack._id);
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

        function changeStatus(inOrOut) {
            return function () {
                var stackId = that.stack._id;
                var memberId = that.currentMember._id;
                return $http.post("/stacks/" + stackId + "/members/" + memberId + "/" + inOrOut)
                    .then(function (res) {
                        that.stack = res.data.stack;
                        that.currentMember = _.findWhere(that.stack.members, { "_id": memberId });
                        console.dir(that.currentMember);
                    }, function (err) {
                        console.warn(err);
                    });
            };
        }

        that.checkIn = changeStatus("checkin");
        that.checkOut = changeStatus("checkout");

        return that;
    }]);
};
