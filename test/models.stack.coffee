"use strict";

should   = require("chai").should()
mongoose = require("mongoose")
_        = require("underscore")
Stack    = require("../models/models.stack.js").Stack

mongoose.connect("mongodb://localhost/phonestacks_test")

describe "Stack", ->

    validStack   = {}
    validSavedStack = {}
    validStack2  = {}
    validUser    = {}
    invalidStack = {}
    invalidUser  = {}

    after ->
        Stack.remove {}, (err) ->
            throw err if err

    describe "a stack", ->

        it "saves if valid", (done) ->
            validStack = new Stack()
            validStack.title = "Friends at bar"
            validStack.penalty = "Buy a round of Jack"
            validStack.save (err, stack) ->
                validSavedStack = stack
                done()

        it "saves without a duplicate key error on members", (done) ->
            validStack2 = new Stack()
            validStack2.title = "Amazing party"
            validStack2.penalty = "Shout something obscene"
            validStack2.save(done)

        it "is found in the DB", (done) ->
            Stack.findOne {"passphrase": validSavedStack.passphrase}, (err, stack) ->
                return done(err) if err
                stack.penalty.should.equal "Buy a round of Jack"
                done()

        it "does not save if invalid", (done) ->
            invalidStack = new Stack()
            invalidStack.title = "Friends at bar"
            invalidStack.save (err) ->
                err.message.should.equal "Validation failed"
                done()

    describe "a user", ->

        it "is added to a stack", ->
            validUser =
                "name": "Joe Smith",
                "phoneNumber": "5558675309",
                "serviceProvider": "att",

            Stack.findOne {"passphrase": validSavedStack.passphrase}, (err, stack) ->
                stack.addMemberToStack validUser, (err, stack, member) ->
                    if err then throw err
                    member.name.should.equal "Joe Smith"

        it "is not added if the name is already taken", ->
            validUser =
                "name": "Joe Smith"

            Stack.findOne {"passphrase": validSavedStack.passphrase}, (err, stack) ->
                if err then throw err
                stack.addMemberToStack validUser, (err) ->
                    err.message.should.match /taken/i

        it "is not added without valid attrs", (done) ->
            invalidUser = {}

            Stack.findOne {"passphrase": validSavedStack.passphrase}, (err, stack) ->
                stack.addMemberToStack invalidUser, (err) ->
                    err.message.should.match /Validation/i
                    done()

        it "is found in the stack by name", ->
            Stack.findOne { "passphrase": validSavedStack.passphrase }, (err, stack) ->
                member = _.where(stack.members, {"name": "Joe Smith"})[0]
                member.name.should.equal "Joe Smith"

        it "is found with all members in a Stack", ->
            Stack.findOne "passphrase": validSavedStack.passphrase, (err, stack) ->
                stack.members.length.should.equal 1

        it "is updated in the stack", ->
            Stack.findOne "passphrase": validSavedStack.passphrase, (err, stack) ->
                member = _.where(stack.members, {"name": "Joe Smith"})[0]
                member.inStack = false
                member.save()
