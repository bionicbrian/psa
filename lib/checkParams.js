"use strict";

var _ = require("underscore");

module.exports = function checkRequiredFields() {
    var fields = _.toArray(arguments);
    return function (req, res, next) {
        var fieldErrs = fields.filter(function (field) {
                return !req.param(field);
            }).map(function (field) {
                return "The " + field + " field is required";
            });

        if (fieldErrs.length > 0) {
            return res.json(400, { status: "error", messages: fieldErrs });
        } else {
            return next();
        }
    };
};