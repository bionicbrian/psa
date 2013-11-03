"use strict";

module.exports = function StackResource(app) {
    app.factory("TimerRes", function () {
        var that = {};

        var timer;
        var startTime;
        var count;
        var done;

        that.grace = 10;

        that.time = {
            timeRemaining: that.grace
        };

        function tick() {
            var newTime = new Date();
            var elapsed = newTime - startTime;
            var remaining = that.grace - Math.floor(elapsed / 1000);
            if (remaining <= 0) {
                that.stop();
            } else {
                that.time.timeRemaining = remaining;
                count(remaining);
            }
        }

        that.init = function (grace, onCount, onComplete) {
            that.grace = grace;
            count = onCount || function () {};
            done = onComplete || function () {};
        };

        that.start = function () {
            that.time.timeRemaining = that.grace;
            timer = setInterval(tick, 1000);
        };

        that.stop = function () {
            clearInterval(timer);
            that.time.timeRemaining = 0;
            done();
        };

        that.reset = function () {
            clearInterval(timer);
            count(that.grace);
            startTime = new Date();
            that.start();
        };

        return that;
    });
};
