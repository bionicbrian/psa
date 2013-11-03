"use strict";

var mongoose = require('mongoose');
var _ = require("underscore");
var Schema = mongoose.Schema;
var passphraser = require("../lib/passphraser");

var memberSchema = new Schema({
    name:            { type: String, required: true, index: false },
    lastCheckIn:     { type: Date, default: Date.now },
    totalTime:       { type: Number, default: 0 },
    phoneNumber:     { type: String, default: "" },
    serviceProvider: { type: String, default: "" },
    inStack:         { type: Boolean, default: true },
});

var stackSchema = new Schema({
    title:      { type: String, required: true },
    penalty:    { type: String, required: true },
    passphrase: { type: String, unique: true },
    createdAt:  { type: Date, default: new Date() },
    modifiedAt: { type: Date, default: new Date() },
    members:    [ memberSchema ]
});

stackSchema.methods.addMemberToStack = function (member, callback) {
    var that = this;
    this.model("Stack").findOne({ passphrase: that.passphrase }, function (err, stack) {
        var taken = _.findWhere(stack.members, {"name": member.name});
        if (taken) {
            return callback(new Error("Member name taken"));
        } else {
            stack.members.push(member);
            stack.save(function (err, stack) {
                if (err) return callback(err);
                var result = _.findWhere(stack.members, {"name": member.name});
                return callback(null, stack, result);
            });
        }
    });
};

stackSchema.pre("save", function(next) {
    // we should have a maxAttempts here so we don't recurse forever :)
    var that = this;
    function tryPassphrase() {
        var passphrase = passphraser();
        that.model("Stack").findOne({ passphrase: passphrase }, function (err, stack) {
            if (err) throw err;
            if (stack === null) {
                that.passphrase = passphrase;
                next();
            } else {
                setTimeout(tryPassphrase, 0);
            }
        });
    }
    if (!that.passphrase) {
        tryPassphrase();
    } else {
        next();
    }
});

var Stack = mongoose.model('Stack', stackSchema);

module.exports = {
  Stack: Stack,
};
