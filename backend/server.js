require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const problemRoutes = require("./routes/ProblemRoutes");
const userRoutes = require("./routes/UserRoutes");
const userProblemRoutes = require("./routes/UserProblemRoutes");

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/problems", problemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/userproblems", userProblemRoutes);

app.get("/", (req, res) => {
    res.send("Server Running");
});

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});