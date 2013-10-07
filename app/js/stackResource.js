"use strict";

module.exports = function stackFactory($resource) {
    return $resource("/stack/:Id",
                     { Id: "@Id" },
                     { "update": { method:"PUT" } });
};