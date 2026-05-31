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
      group
      bg-zinc-900
      border border-zinc-800
      rounded-xl
      p-4
      transition-all
      hover:border-zinc-600
    "
  >
    {/* Always visible */}
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

      <button
        onClick={handleSolved}
        className={`
          px-3
          py-1
          rounded-lg
          text-sm
          font-medium
          transition

          ${
            solved
              ? "bg-green-600 hover:bg-green-500"
              : "bg-zinc-700 hover:bg-zinc-600"
          }
        `}
      >
        {solved ? "Solved ✓" : "Mark Solved"}
</button>
    </div>

    {/* Only visible on hover */}
    <div
      className="
        max-h-0
        overflow-hidden
        opacity-0
        transition-all
        duration-300

        group-hover:max-h-96
        group-hover:opacity-100
        group-hover:mt-4
      "
    >
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
          mt-3
          bg-zinc-800
          border border-zinc-700
          rounded
          p-2
          text-sm
        "
        rows={3}
      />
    </div>
  </div>
);
}

export default ProblemCard;