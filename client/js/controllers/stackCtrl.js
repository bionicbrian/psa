"use strict";

var _ = require("underscore");

module.exports = function stackCtrl($scope, StackRes, TimerRes) {
    var GRACE = 10;
    $scope.stack = StackRes.stack;

    function safeApply() {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

    function count(timeLeft) {
        console.log("WE ONLY HAVE %s SECONDS LEFT", timeLeft);
        $scope.timeLeft = timeLeft;
        safeApply();
    }

    function done() {
        console.log("we are done");
        $scope.checkOut();
        safeApply();
    }

    TimerRes.init(GRACE, count, done);
    TimerRes.reset();

    $scope.checkIn = function () {
        StackRes.checkIn().then(function () {
            TimerRes.reset();
        });
    };

    $scope.checkOut = function () {
        StackRes.checkOut().then(safeApply);
    };

    $scope.isInactive = function (name) {
        var memberName = name || StackRes.currentMember.name;
        var member = _.findWhere(StackRes.stack.members, { name: memberName });
        return !member.inStack;
    };

    $scope.isCountingDown = function () {
        return StackRes.currentMember.inStack;
    };
};
