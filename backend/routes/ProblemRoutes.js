const express = require("express");
const router = express.Router();

const Problem = require("../models/Problem");

// GET all problems
router.get("/", async (req, res) => {
    try {
        const problems = await Problem.find();

        res.json(problems);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});

// GET problems by topic
router.get("/topic/:topic", async (req, res) => {
    try {
        const problems = await Problem.find({
            topic: req.params.topic,
        });

        res.json(problems);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});

module.exports = router;