const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    topic: {
        type: String,
        required: true,
    },

    link: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Problem", ProblemSchema);