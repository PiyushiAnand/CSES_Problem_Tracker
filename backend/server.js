require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const problemRoutes = require("./routes/ProblemRoutes");
const userRoutes = require("./routes/UserRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/problems", problemRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});