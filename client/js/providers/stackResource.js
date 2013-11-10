"use strict";

var _ = require("underscore");

module.exports = function StackResource(app) {
    app.factory("StackRes", ["$http", "$q", function ($http, $q) {
        var that = this;
        var timeout;

        that.stack = {};
        that.currentMember = {};

        function getStack() {
            clearTimeout(timeout);
            var stackId = that.stack._id;
            var memberId = that.currentMember._id

            return $http.get("/stacks/" + stackId)
                .then(function (res) {
                    that.stack = res.data.stack;
                    that.currentMember = _.findWhere(that.stack.members, { "_id": memberId });

                    timeout = setTimeout(getStack, 5000);
                }, function () {
                    timeout = setTimeout(getStack, 5000);
                });
        }

        function updateStack(res) {
            that.stack = res.data.stack;
            return $q.when(that.stack);
        }

        that.clear = function () {
            that.stack = {};
        };

        that.create = function (title, penalty) {
            var data = {
                title: title,
                penalty: penalty
            };
            return $http.post("/stack", data).then(updateStack);
        };

        that.join = function (name, passphrase) {
            if (name && passphrase) {
                var data = {
                    passphrase: passphrase,
                    name: name
                };

                clearTimeout(timeout);

                return $http.post("/join", data)
                    .then(function (res) {
                        that.stack = res.data.stack;
                        that.currentMember = res.data.member;

                        timeout = setTimeout(getStack, 5000);
                    });
            } else {
                throw new Error("Need name and passphrase!");
            }
        };

        function changeStatus(inOrOut) {
            return function () {
                var stackId = that.stack._id;
                var memberId = that.currentMember._id;
                clearTimeout(timeout);
                return $http.post("/stacks/" + stackId + "/members/" + memberId + "/" + inOrOut)
                    .then(function (res) {
                        that.stack = res.data.stack;
                        that.currentMember = _.findWhere(that.stack.members, { "_id": memberId });

                        timeout = setTimeout(getStack, 5000);
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
