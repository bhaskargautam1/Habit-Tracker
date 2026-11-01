const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    progress: {
        type: Number,
        default: 0
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });

module.exports = mongoose.model("Goal", goalSchema);