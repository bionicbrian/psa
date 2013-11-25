"use strict";

var mongoose    = require("mongoose");
var _           = require("underscore");
var Stack       = require("../models/models.stack").Stack;
var Member      = require("../models/models.stack").Member;
var express     = require("express");
var router      = new express.Router();
var checkParams = require("../lib/checkParams");
var nodemailer  = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "bionicbrian@gmail.com",
        pass: "Evil666"
    }
});

var mailOptions = {
    from: "Brian Moore <bionicbrian@gmail.com>", // sender address
    to: "bionicbrian@gmail.com", // list of receivers
    subject: "Hello!", // Subject line
    text: "Hello world!", // plaintext body
    html: "<b>hey ho whaddaya say!</b>" // html body
}

router.get("/", function (req, res){
    res.render("index");
});

router.post("/stack", checkParams("title", "penalty"), function (req, res) {
    var stack = new Stack({
        title: req.body.title,
        penalty: req.body.penalty
    });
    stack.save(function (err, stack) {
        if (err) {
            return res.json(400, { status: "error", messages: [err.message] });
        }

        req.session.passphrase = stack.passphrase;
        return res.json(200, { status: "success", stack: stack });
    });
});

router.post("/join", checkParams("passphrase", "name"), function (req, res) {
    Stack.findOne({ "passphrase": req.param("passphrase") }, foundStack);

    function foundStack(err, stack) {
        if (err) {
            return res.json(404, { status: "error", messages: [err.message] });
        }
        stack.addMemberToStack({ "name": req.param("name") }, addedMember);
    }

    function addedMember(err, stack, member) {
        if (err) {
            return res.json(400, { status: "error", messages: [err.message] });
        }

        req.session.passphrase = stack.passphrase;
        req.session.memberID = member._id;
        return res.json(200, { status: "success", stack: stack, member: member });
    }
});

router.post("/stacks/:stackID/members/:memberID/:inOrOut", function (req, res) {
    var stackID = req.params.stackID;
    var memberID = req.params.memberID;
    var inStack = req.params.inOrOut === "checkin" ? true : false;

    Stack.findOne({ "_id": stackID }, foundStack);

    function foundStack(err, stack) {
        if (err) {
            return res.json(404, { status: "error", messages: [err.message] });
        }

        var member = stack.members.id(memberID);

        if (!member) {
            return res.json(404, { status: "error", messages: ["Member not found"] });
        }

        member.inStack = inStack;
        if (inStack) {
            member.lastCheckIn = new Date();
        }
        stack.save(stackSaved);
    }

    function stackSaved(err, stack) {
        if (err) {
            return res.json(400, { status: "error", messages: [err.message] });
        }

        smtpTransport.sendMail(mailOptions, function(error, response){
            if (error) {
                console.log(error);
            } else {
                console.log("Message sent: " + response.message);
            }

            // if you don't want to use this transport object anymore, uncomment following line
            smtpTransport.close(); // shut down the connection pool, no more messages

            return res.json(200, { status: "success", stack: stack });
        });
    }
});

router.get("/stacks/:stackID", function (req, res) {
    if (!req.params.stackID) {
        return res.json(400, { status: "error", messages: ["Stack not found"] });
    }

    Stack.findOne({ _id: req.params.stackID }, foundStack);

    function foundStack(err, stack) {
        if (err) {
            return res.json(404, { status: "error", messages: ["Stack not found"] });
        }

        return res.json(200, { status: "success", stack: stack });
    }
});

module.exports = router;
