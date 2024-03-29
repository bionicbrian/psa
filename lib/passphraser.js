"use strict";

var nouns = [
    "alligator",
    "ape",
    "baboon",
    "bat",
    "bird",
    "bug",
    "camel",
    "cheetah",
    "cougar",
    "crocodile",
    "dolphin",
    "duck",
    "eagle",
    "elephant",
    "fish",
    "gorilla",
    "hen",
    "iguana",
    "kangaroo",
    "lemur",
    "mongoose",
    "orca",
    "otter",
    "puma",
    "shark",
    "squid",
    "whale",
    "falcon",
    "hawk",
    "dove",
    "owl",
    "sparrow",
    "penguin",
    "robin",
    "magpie",
    "finch",
    "mole",
    "hamster",
    "fox",
    "coyote",
    "wolf",
    "parrot",
    "monkey",
    "chimp",
    "turkey",
    "chicken",
    "pig",
    "cow",
    "zebra",
    "lion",
    "moose",
    "turtle",
    "octopus",
    "snake",
    "python",
    "viper"
];

var adjectives = [
    "adorable",
    "angry",
    "bad",
    "beautiful",
    "clever",
    "cool",
    "clever",
    "curious",
    "deadly",
    "envious",
    "evil",
    "friendly",
    "gentle",
    "good",
    "heavy",
    "lovely",
    "mean",
    "new",
    "old",
    "perfect",
    "rad",
    "radical",
    "rare",
    "silly",
    "sinister",
    "stinky",
    "sweet",
    "cute",
    "sneaky",
    "devious",
    "stupid",
    "ugly",
    "rude",
    "grumpy",
    "moody",
    "crazy",
    "wild",
    "scary"
];

var colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
    "black",
    "white",
    "brown"
];

module.exports = function createPassphrase() {
    var nounIndex = Math.floor(Math.random() * nouns.length);
    var adjIndex = Math.floor(Math.random() * adjectives.length);
    var colorIndex = Math.floor(Math.random() * colors.length);
    return adjectives[adjIndex] + " " + colors[colorIndex] + " " + nouns[nounIndex];
}
