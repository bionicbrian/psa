"use strict";

var _ = require("underscore");
var nodemailer  = require("nodemailer");

module.exports = function Notifier() {
    var that = this;

    var serviceProviders = {
        "att": "txt.att.net",
        "verizon": "vtext.com"
    };

    function constructEmailAddress(member) {
        return member.phoneNumber + "@" + serviceProviders[member.serviceProvider];
        // return "7146428438@txt.att.net";
    }

    function statusChangedMessage (member, inStack) {
        return member.name + " checked " + (inStack ? "in" : "out") + "!"
    }

    var smtpTransport = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: "bionicbrian@gmail.com",
            pass: "Evil666"
        }
    });

    var mailOptions = {
        from: "Brian Moore <bionicbrian@gmail.com>", // sender address
        // to: "bionicbrian@gmail.com", // list of receivers
        // subject: "Hello!", // Subject line
        // text: "Hello world!", // plaintext body
    };

    that.sendNotifications = function (member, inStack, stack, callback) {
        var notificationOptions;

        var membersToNotify = stack.members.filter(function (m) {
            if (!m.phoneNumber || !m.serviceProvider) {
                return false;
            } else {
                if (m.phoneNumber === member.phoneNumber) {
                    return false;
                } else {
                    return true;
                }
            }
        });

        var addresses = membersToNotify.map(constructEmailAddress);

        if (addresses.length > 0) {
            notificationOptions = _.extend(mailOptions, {
                to: addresses.join(", "),
                subject: statusChangedMessage(member, inStack),
            });

            smtpTransport.sendMail(notificationOptions, function (err, response) {
                // if you don't want to use this transport object anymore, uncomment following line
                // smtpTransport.close(); // shut down the connection pool, no more messages
                if (err) {
                    console.log(err);
                } else {
                    console.log("Message sent: " + response.message);
                }

                if (typeof callback === "function") {
                    callback(err, repsponse);
                }
            });
        }
    };
};
