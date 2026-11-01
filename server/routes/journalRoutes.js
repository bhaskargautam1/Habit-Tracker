const express = require("express");

const router = express.Router();

const Journal = require("../models/Journal");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {

    try {

        const entry = await Journal.create({

            text: req.body.text,

            userId: req.user.id

        });

        res.json(entry);

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

});

router.get("/", authMiddleware, async (req, res) => {

    try {

        const entries = await Journal.find({
            userId: req.user.id
        }).sort({ createdAt: -1 });

        res.json(entries);

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

});

router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        await Journal.findByIdAndDelete(req.params.id);

        res.json({
            message: "Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

});

module.exports = router;