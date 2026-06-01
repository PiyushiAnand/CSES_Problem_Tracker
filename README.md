# CSES Problem Tracker

A full-stack tracker for solving CSES problems by topic. The app includes a React + Vite frontend and an Express + MongoDB backend for saving user progress, difficulty, notes, and topic stats.

## Features

- User login / create account by username
- Browse CSES problems grouped by topic
- Track solved status for each problem
- Save difficulty level and personal notes per problem
- View topic completion progress and stats
- Persist user progress in MongoDB

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Express, Node.js, MongoDB, Mongoose
- Data import script to seed problems from `topics.json`

## Repository Structure

- `/backend` - Express server, MongoDB models, API routes
- `/frontend` - React application built with Vite
- `topics.json` - source problem list used for backend seeding

## Setup

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file in `/backend` with the MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
```

If you want to seed problems into the database, run:

```bash
node scripts/importProblems.js
```

Start the backend server:

```bash
npm run dev
```

The backend server will run on `http://localhost:5001` by default.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the local Vite URL shown in the terminal (usually `http://localhost:5173`).

## Usage

1. Open the frontend app in your browser.
2. Enter a username to log in or create a new account.
3. Browse problems by topic.
4. Click `Mark Solved` to save solved status.
5. Use the difficulty dropdown and notes field to track progress.
6. Progress is preserved per-user in MongoDB.

## API Endpoints

### Problems

- `GET /api/problems` - Get all problems
- `GET /api/problems/topic/:topic` - Get problems for a specific topic

### Users

- `POST /api/users/login` - Login or create a user by username
- `POST /api/users` - Create a new user

### User Progress

- `POST /api/userproblems` - Create or update problem progress
- `PATCH /api/userproblems/solve` - Update solved status only
- `PATCH /api/userproblems/difficulty` - Update difficulty only
- `PATCH /api/userproblems/notes` - Update notes only
- `PATCH /api/userproblems/concepts` - Update concepts only
- `GET /api/userproblems/user/:userId` - Get all progress for a user
- `GET /api/userproblems/:userId/:problemId` - Get progress for a specific problem
- `GET /api/userproblems/stats/:userId` - Get all topic stats for a user
- `GET /api/userproblems/stats/:userId/topic/:topic` - Get stats for a topic
- `DELETE /api/userproblems/:userId/:problemId` - Delete progress for a problem
- `DELETE /api/userproblems/reset/:userId` - Reset all progress for a user
- `DELETE /api/userproblems/reset/:userId/topic/:topic` - Reset progress for a topic

## Data Models

- `Problem` - problem name, topic, and CSES link
- `User` - username and solved problem references
- `UserProblem` - user problem progress with solved, difficulty, concepts, and notes

## Notes

- The frontend is configured to talk to `http://localhost:5001/api`.
- If you change backend ports, update `frontend/src/App.jsx` accordingly.
- Make sure MongoDB is reachable from your environment.

## License

This project is available under the MIT License.
