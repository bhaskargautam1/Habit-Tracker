const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    completedDays: {
        type: [String],
        default: []
    },
    streak: {
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model("Habit", habitSchema);