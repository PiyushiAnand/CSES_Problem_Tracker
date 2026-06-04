# CSES Problem Tracker

A full-stack web application for tracking progress on the CSES Problem Set (or any topic-based problem set). Problems are organized by topic, and users can track solved problems, difficulty ratings, personal notes, and completion statistics.

**Live Demo:** https://cses-problem-tracker-2.onrender.com

This might take a while to load since I'm using free version of render.

---

## Features

- User login / account creation using a username
- Problems grouped by topic
- Mark problems as solved or unsolved
- Track personal difficulty ratings
- Add notes and hints for future reference
- Topic-wise progress bars and completion statistics
- Reset progress for individual topics
- Reset all progress with one click
- Persistent storage using MongoDB
- Responsive React frontend

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Deployment

- Render
- MongoDB Atlas

---

## Screenshots

_Add screenshots here._

---

## Project Structure

```text
CSES-Problem-Tracker/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── ...
│   └── ...
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   │   └── importProblems.js
│   ├── server.js
│   └── ...
│
├── topics.json
├── get_links.py
└── README.md
```

---

## Using Your Own Problem Set

This tracker is not limited to CSES. It can work with any collection of problems as long as they are provided in the correct `topics.json` format.

### Example Format

```json
[
  {
    "topic": "Graphs",
    "problems": [
      {
        "name": "Building Roads",
        "link": "https://example.com/problem1"
      },
      {
        "name": "Round Trip",
        "link": "https://example.com/problem2"
      }
    ]
  }
]
```

### Importing Problems

The application reads problems from MongoDB, not directly from `topics.json`.

Whenever you create or modify `topics.json`, run:

```bash
cd backend

node scripts/importProblems.js
```

This script:

- Reads all topics and problems from `topics.json`
- Inserts them into MongoDB
- Makes them available to the frontend

**Important:** If you update `topics.json`, run the import script again so the database stays synchronized.

---

## CSES Web Crawler

A crawler for generating a CSES-compatible `topics.json` is included:

```bash
get_links.py
```

The crawler extracts problem names and links from the CSES website and generates data that can be imported using:

```bash
node scripts/importProblems.js
```

You can also modify the crawler for other problem sources.

---

# Running Locally

## 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/cses-problem-tracker.git

cd cses-problem-tracker
```

---

## 2. Configure MongoDB

Create a `.env` file inside `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5001
```

You can create a free MongoDB Atlas cluster and obtain the connection string from Atlas.

---

## 3. Update Backend CORS Settings

The deployed version is configured to accept requests from the hosted frontend.

In `backend/server.js`, replace:

```js
app.use(
  cors({
    origin: "https://cses-problem-tracker-2.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
```

with:

```js
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
```

---

## 4. Update Frontend API URLs

### In `frontend/src/App.jsx`

Replace:

```js
const API_URL =
  "https://cses-problem-tracker-1.onrender.com/api";
```

with:

```js
const API_URL =
  "http://localhost:5001/api";
```

### In `frontend/src/components/ProblemCard.jsx`

Replace:

```js
const API_URL =
  "https://cses-problem-tracker-1.onrender.com/api";
```

with:

```js
const API_URL =
  "http://localhost:5001/api";
```

---

## 5. Add and Import Problems

Create or modify `topics.json`, then import the problems:

```bash
cd backend

node scripts/importProblems.js
```

Verify that the problems appear in your MongoDB database before starting the frontend.

---

## 6. Start the Backend

```bash
cd backend

npm install
npm run dev
```

Backend will run on:

```text
http://localhost:5001
```

---

## 7. Start the Frontend

```bash
cd frontend

npm install
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## 8. Open the Application

Visit:

```text
http://localhost:5173
```

and start tracking your progress.

---

# Deployment

## Backend Deployment

Deploy the Express server to Render and ensure:

- Environment variables are configured
- MongoDB Atlas network access is enabled
- Atlas connection string is correct

Example API URL:

```text
https://your-backend.onrender.com/api
```

---

## Frontend Deployment

Update the API URLs in:

- `frontend/src/App.jsx`
- `frontend/src/components/ProblemCard.jsx`

Example:

```js
const API_URL =
  "https://your-backend.onrender.com/api";
```

Then deploy the frontend using:

- Render
- Vercel
- Netlify

or any other static hosting provider.

---

## Database Models

### User

```js
{
  username: String
}
```

### Problem

```js
{
  name: String,
  topic: String,
  link: String
}
```

### UserProblem

```js
{
  user: ObjectId,
  problem: ObjectId,
  solved: Boolean,
  difficulty: String,
  notes: String,
  concepts: []
}
```

---

## Future Improvements

- Search and filter problems
- Sorting by difficulty
- Tags and custom categories
- Import/export progress
- OAuth authentication
- Streak tracking
- Leaderboards
- Dark/light theme toggle
- Public profiles

