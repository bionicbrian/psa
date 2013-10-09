"use strict";

module.exports = function StackResource(app) {
    app.factory("Stack", function () {
        var stack = {
            title: "",
            penalty: "",
            members: []
        };

        stack.rejoin = function (passphrase, name) {
            // AJAX request here
            stack.title = "Mock title";
            stack.penalty = "Buy a round";
            stack.passphrase = passphrase;
            stack.members.push({ name: name });
        };

        stack.create = function (title, penalty) {
            // AJAX request here
            stack.title = title;
            stack.penalty = penalty;
        };

        return stack;
    });
};

// module.exports = function stackFactory($resource) {
//     return $resource("/stack/:Id",
//                      { Id: "@Id" },
//                      { "update": { method:"PUT" } });
// };