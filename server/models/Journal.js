const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({

    text: {
        type: String,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });

module.exports = mongoose.model("Journal", journalSchema);