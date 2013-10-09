"use strict";

module.exports = function LocalResource(app) {
    app.factory("Local", function () {
        var local = {};

        if (window.localStorage) {
            local.title = window.localStorage.title;
            local.passphrase = window.localStorage.passphrase;
            local.name = window.localStorage.name;
        }

        local.create = function (title, passphrase, name) {
            window.localStorage.title = title;
            window.localStorage.passphrase = passphrase;
            window.localStorage.name = name;
        };

        return local;
    });
};
