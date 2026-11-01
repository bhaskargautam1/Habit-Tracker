const express = require("express");
const router = express.Router();

const Goal = require("../models/Goal");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {

    try {

        const goal = await Goal.create({
            title: req.body.title,
            progress: req.body.progress || 0,
            userId: req.user.id
        });

        res.json(goal);

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }

});

router.get("/", authMiddleware, async (req, res) => {

    try {

        const goals = await Goal.find({
            userId: req.user.id
        });

        res.json(goals);

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }

});

router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        await Goal.findByIdAndDelete(req.params.id);

        res.json({ message: "Goal deleted" });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }

});

router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const goal = await Goal.findById(req.params.id);

        goal.progress = req.body.progress;

        await goal.save();

        res.json(goal);

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }

});

module.exports = router;