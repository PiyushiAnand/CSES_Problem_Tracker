// routes/UserProblemRoutes.js

const express = require("express");
const router = express.Router();

const UserProblem = require("../models/UserProblem");


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


// ========================================
// GET progress for a specific problem
// ========================================

router.get("/:userId/:problemId", async (req, res) => {
    try {
        const progress = await UserProblem.findOne({
            user: req.params.userId,
            problem: req.params.problemId,
        }).populate("problem");

        if (!progress) {
            return res.status(404).json({
                message: "Progress not found",
            });
        }

        res.json(progress);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});


// ========================================
// CREATE / UPDATE progress
// ========================================

router.post("/", async (req, res) => {
    try {
        const {
            user,
            problem,
            solved,
            difficulty,
            concepts,
            notes,
        } = req.body;

        if (!user || !problem) {
            return res.status(400).json({
                message: "User and problem are required",
            });
        }

        const progress =
            await UserProblem.findOneAndUpdate(
                {
                    user,
                    problem,
                },
                {
                    solved,
                    difficulty,
                    concepts,
                    notes,
                },
                {
                    upsert: true,
                    new: true,
                    runValidators: true,
                }
            );

        res.json(progress);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});


// ========================================
// UPDATE solved status only
// ========================================

router.patch("/solve", async (req, res) => {
    try {
        const {
            user,
            problem,
            solved,
        } = req.body;

        const progress =
            await UserProblem.findOneAndUpdate(
                {
                    user,
                    problem,
                },
                {
                    solved,
                },
                {
                    upsert: true,
                    new: true,
                    runValidators: true,
                }
            );

        res.json(progress);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});


// ========================================
// UPDATE difficulty only
// ========================================

router.patch("/difficulty", async (req, res) => {
    try {
        const {
            user,
            problem,
            difficulty,
        } = req.body;

        const progress =
            await UserProblem.findOneAndUpdate(
                {
                    user,
                    problem,
                },
                {
                    difficulty,
                },
                {
                    upsert: true,
                    new: true,
                    runValidators: true,
                }
            );

        res.json(progress);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});


// ========================================
// UPDATE notes only
// ========================================

router.patch("/notes", async (req, res) => {
    try {
        const {
            user,
            problem,
            notes,
        } = req.body;

        const progress =
            await UserProblem.findOneAndUpdate(
                {
                    user,
                    problem,
                },
                {
                    notes,
                },
                {
                    upsert: true,
                    new: true,
                    runValidators: true,
                }
            );

        res.json(progress);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});


// ========================================
// UPDATE concepts only
// ========================================

router.patch("/concepts", async (req, res) => {
    try {
        const {
            user,
            problem,
            concepts,
        } = req.body;

        const progress =
            await UserProblem.findOneAndUpdate(
                {
                    user,
                    problem,
                },
                {
                    concepts,
                },
                {
                    upsert: true,
                    new: true,
                    runValidators: true,
                }
            );

        res.json(progress);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});


// ========================================
// DELETE progress
// ========================================

router.delete("/:userId/:problemId", async (req, res) => {
    try {
        await UserProblem.findOneAndDelete({
            user: req.params.userId,
            problem: req.params.problemId,
        });

        res.json({
            message: "Progress deleted",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});

module.exports = router