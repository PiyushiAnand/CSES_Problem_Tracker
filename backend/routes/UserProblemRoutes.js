// routes/UserProblemRoutes.js

const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");
const User = require("../models/User");
const UserProblem = require("../models/UserProblem");



// ========================================
// CREATE / UPDATE progress
// ========================================

router.post("/", async (req, res) => {
    try {

        let {
            user,
            problem,
            solved,
            difficulty,
            notes,
        } = req.body;

        if (!user || !problem) {
            return res.status(400).json({
                message: "User and problem are required",
            });
        }

        // prevent enum validation issues
        if (difficulty === "") {
            difficulty = undefined;
        }

        const progress =
            await UserProblem.findOneAndUpdate(
                {
                    user,
                    problem,
                },
                {
                    $set: {
                        solved,
                        difficulty,
                        notes,
                    },
                },
                {
                    upsert: true,
                    new: true,
                    runValidators: true,
                    setDefaultsOnInsert: true,
                }
            );

        // console.log(
        //     "Progress updated successfully:"
        // );
        // console.log(progress);

        res.status(200).json(progress);
    } catch (err) {
        console.error(
            "Error updating progress:"
        );
        console.error(err);

        res.status(500).json({
            message: err.message,
        });
    }
});


router.delete("/reset/:userId", async (req, res) => {
    try {
        console.log("Resetting all progress for user:", req.params.userId);
        await UserProblem.deleteMany({
            user: req.params.userId,
        });
    
        res.json({
            message: "All progress reset",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});


router.delete(
    "/reset/:userId/topic/:topic",
    async (req, res) => {
        try {
            const problems = await Problem.find({
                topic: req.params.topic,
            });

            const ids = problems.map(
                (p) => p._id
            );

            await UserProblem.deleteMany({
                user: req.params.userId,
                problem: { $in: ids },
            });

            res.json({
                message:
                    "Topic progress reset",
            });
        } catch (err) {
            res.status(500).json({
                message: err.message,
            });
        }
    }
);


// ========================================
// TOPIC STATS
// ========================================

router.get(
    "/stats/:userId/topic/:topic",
    async (req, res) => {
        // console.log("Fetching stats for user:", req.params.userId, "topic:", req.params.topic);
        try {
          //  console.log(req.params);
            const problems = await Problem.find({
                topic: req.params.topic,
            });

            const ids = problems.map(
                (p) => p._id
            );

            const solved =
                await UserProblem.countDocuments({
                    user: req.params.userId,
                    problem: { $in: ids },
                    solved: true,
                });

            const total = problems.length;

            res.json({
                topic: req.params.topic,
                solved,
                total,
                percentage:
                    total === 0
                        ? 0
                        : (
                              (solved / total) *
                              100
                          ).toFixed(2),
            });
        } catch (err) {
            res.status(500).json({
                message: err.message,
            });
        }
    }
);


// ========================================
// GET all progress for a user
// ========================================

router.get("/user/:userId", async (req, res) => {
    try {
        const progress = await UserProblem.find({
            user: req.params.userId,
        })
            .populate("problem")
            .sort({ updatedAt: -1 });

        res.json(progress);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});

module.exports = router