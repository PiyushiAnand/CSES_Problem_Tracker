require("dotenv").config();

const mongoose = require("mongoose");
const fs = require("fs");

const Problem = require("../models/Problem");

mongoose.connect(process.env.MONGO_URI);

async function importData() {
    const raw = fs.readFileSync("cses_problems.json");
    const data = JSON.parse(raw);

    await Problem.deleteMany();

    const docs = [];

    for (const topic in data) {
        for (const problem of data[topic]) {
            docs.push({
                topic,
                name: problem.name,
                link: problem.link
            });
        }
    }

    await Problem.insertMany(docs);

    console.log("Problems Imported");
    process.exit();
}

importData();