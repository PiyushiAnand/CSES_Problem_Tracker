const express = require("express");
const router = express.Router();

const User = require("../models/User");

// create user
router.post("/", async (req, res) => {
    try {
        const user = await User.create({
            username: req.body.username,
        });

        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { username } = req.body;
        console.log(username);
        let user = await User.findOne({ username });

        if (!user) {
            user = await User.create({
                username,
                solvedProblems: [],
            });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});

// get user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate("solvedProblems");

        res.json(user);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});

module.exports = router;