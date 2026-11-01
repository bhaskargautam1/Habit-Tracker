const express = require("express");
const router = express.Router();
const Habit = require("../models/Habit");
const authMiddleware = require("../middleware/authMiddleware");


// CREATE HABIT
router.post("/", authMiddleware, async (req, res) => {
    try {
        const habit = await Habit.create({
            name: req.body.name,
            userId: req.user.id
        });

        res.json(habit);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


// GET HABITS
router.get("/", authMiddleware, async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.user.id });
        res.json(habits);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


// DELETE HABIT
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        await Habit.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const habit = await Habit.findById(req.params.id);

        if (!habit) {

            return res.status(404).json({
                message: "Habit not found"
            });

        }

        const { date } = req.body;

        const alreadyCompleted =
            habit.completedDays.includes(date);

        if (alreadyCompleted) {

            habit.completedDays =
                habit.completedDays.filter(
                    (d) => d !== date
                );

        } else {

            habit.completedDays.push(date);

        }

        await habit.save();

        res.json(habit);

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

});

module.exports = router;