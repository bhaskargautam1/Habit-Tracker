require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/habits", require("./routes/habitRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/journal", require("./routes/journalRoutes"));




mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Welcome");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});