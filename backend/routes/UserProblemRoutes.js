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
        // console.log("========== POST /userproblems ==========");
        // console.log("BODY:", req.body);

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



router.delete("/reset/:userId", async (req, res) => {
    try {
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
// ALL TOPIC STATS
// ========================================

router.get(
    "/stats/:userId",
    async (req, res) => {
        // console.log("Fetching all stats for user:", req.params.userId);
        try {
            const topics =
                await Problem.distinct(
                    "topic"
                );

            const result = [];

            for (const topic of topics) {
                const problems =
                    await Problem.find({
                        topic,
                    });

                const ids = problems.map(
                    (p) => p._id
                );

                const solved =
                    await UserProblem.countDocuments(
                        {
                            user: req.params.userId,
                            problem: {
                                $in: ids,
                            },
                            solved: true,
                        }
                    );

                result.push({
                    topic,
                    solved,
                    total:
                        problems.length,
                    percentage:
                        problems.length ===
                        0
                            ? 0
                            : (
                                  (solved /
                                      problems.length) *
                                  100
                              ).toFixed(2),
                });
            }

            res.json(result);
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


// ========================================
// GET progress for a specific problem
// ========================================

router.get("/:userId/:problemId", async (req, res) => {
    try {
      //  console.log("Fetching progress for user:", req.params.userId, "problem:", req.params.problemId);
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


module.exports = router