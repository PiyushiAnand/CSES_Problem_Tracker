import { useState, useEffect } from "react";

// const API_URL = "http://localhost:5001/api";
const API_URL = "https://cses-problem-tracker-1.onrender.com/api/";
function ProblemCard({
  problem,
  user,
  progressmap,
  updateProgress,
}) {
  const [solved, setSolved] =
    useState(false);

  const [difficulty, setDifficulty] =
    useState("");

  const [notes, setNotes] =
    useState("");

 // console.log(progressmap);
  useEffect(() => {
  const progress = progressmap?.[problem._id];

  setSolved(progress?.solved || false);
  setDifficulty(progress?.difficulty || "");
  setNotes(progress?.notes || "");
}, [progressmap, problem._id]);


  // console.log(`Progress for problem ${problem._id}:`, {
  //   solved,
  //   difficulty,
  //   notes,
  // });  

  const saveProgress = async (
    updates = {}
  ) => {
    try {
      await fetch(
        `${API_URL}/userproblems`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            user: user._id,
            problem: problem._id,

            solved,
            difficulty,
            notes,
            concepts: [],

            ...updates,
          }),
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleSolved = async () => {
  const newSolved = !solved;

  setSolved(newSolved);

  updateProgress(problem._id, {
    solved: newSolved,
  });

  await saveProgress({
    solved: newSolved,
  });
};
  const handleDifficulty = async (
    value
  ) => {
    setDifficulty(value);

    await saveProgress({
      difficulty: value,
    });
  };

  const handleNotesBlur = async () => {
    await saveProgress({
      notes,
    });
  };

  return (
    <div
      className={`
        group
        rounded-xl
        p-4
        border
        transition-all

        ${
          solved
            ? "bg-green-900/20 border-green-700"
            : "bg-zinc-900 border-zinc-800 hover:border-zinc-600"
        }
      `}
    >
      <div className="flex items-center justify-between">
        <a
          href={problem.link}
          target="_blank"
          rel="noreferrer"
          className="text-lg font-medium hover:text-blue-400"
        >
          {problem.name}
        </a>

        <button
          onClick={handleSolved}
          className={`
            px-3 py-1 rounded-lg text-sm font-medium transition

            ${
              solved
                ? "bg-green-600 hover:bg-green-500"
                : "bg-zinc-700 hover:bg-zinc-600"
            }
          `}
        >
          {solved
            ? "Solved ✓"
            : "Mark Solved"}
        </button>
      </div>

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
        <select
          value={difficulty}
          onChange={(e) =>
            handleDifficulty(
              e.target.value
            )
          }
          className="
            bg-zinc-800
            border border-zinc-700
            rounded
            px-2 py-1
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

        <textarea
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          onBlur={handleNotesBlur}
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