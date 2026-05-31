const mongoose = require("mongoose");

const UserProblemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
        required: true,
    },

    solved: {
        type: Boolean,
        default: false,
    },

    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        default: null,
    },
    concepts: [
        {
            type: String,
        },
    ],
    notes: {
        type: String,
        default: "",
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model(
    "UserProblem",
    UserProblemSchema
);