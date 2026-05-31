import { useState } from "react";

const API_URL = "http://localhost:5001/api";

function ProblemCard({ problem, user }) {
  const [solved, setSolved] = useState(false);
  const [difficulty, setDifficulty] = useState("");
  const [notes, setNotes] = useState("");

  const saveProgress = async (updates = {}) => {
    try {
      await fetch(`${API_URL}/userproblems`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user._id,
          problem: problem._id,

          solved,
          difficulty,
          notes,

          ...updates,
        }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSolved = async () => {
    const newSolved = !solved;

    setSolved(newSolved);

    saveProgress({
      solved: newSolved,
    });
  };

  const handleDifficulty = async (value) => {
    setDifficulty(value);

    saveProgress({
      difficulty: value,
    });
  };

  return (
    <div
      className="
        bg-zinc-900
        border border-zinc-800
        rounded-xl
        p-4
        space-y-3
      "
    >
      <div className="flex items-center justify-between">
        <a
          href={problem.link}
          target="_blank"
          rel="noreferrer"
          className="
            text-lg
            font-medium
            hover:text-blue-400
          "
        >
          {problem.name}
        </a>

        <input
          type="checkbox"
          checked={solved}
          onChange={handleSolved}
          className="h-5 w-5"
        />
      </div>

      <div>
        <select
          value={difficulty}
          onChange={(e) =>
            handleDifficulty(e.target.value)
          }
          className="
            bg-zinc-800
            border border-zinc-700
            rounded
            px-2
            py-1
            text-sm
          "
        >
          <option value="">
            Difficulty
          </option>

          <option value="Easy">
            Easy
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Hard">
            Hard
          </option>
        </select>
      </div>

      <textarea
        value={notes}
        onChange={(e) =>
          setNotes(e.target.value)
        }
        onBlur={() =>
          saveProgress({
            notes,
          })
        }
        placeholder="Notes / hints..."
        className="
          w-full
          bg-zinc-800
          border border-zinc-700
          rounded
          p-2
          text-sm
        "
        rows={3}
      />
    </div>
  );
}

export default ProblemCard;