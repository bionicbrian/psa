"use strict";

module.exports = function stackCtrl($scope, StackRes, TimerRes) {
    var GRACE = 10;
    $scope.stack = StackRes.stack;

    function count(timeLeft) {
        console.log("WE ONLY HAVE %s SECONDS LEFT", timeLeft);
        $scope.timeLeft = timeLeft;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

    function done() {
        console.log("we are done");
        $scope.checkOut();
    }

    TimerRes.init(GRACE, count, done);
    TimerRes.reset();

    $scope.checkIn = function () {
        StackRes.checkIn().then(function () {
            TimerRes.reset();
        });
    };

    $scope.checkOut = StackRes.checkOut;

    $scope.isInactive = function () {
        return !StackRes.currentMember.inStack;
    };

    $scope.isCountingDown = function () {
        return StackRes.currentMember.inStack;
    };
};
