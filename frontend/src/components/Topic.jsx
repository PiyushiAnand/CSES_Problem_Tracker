import ProblemCard from "./ProblemCard";

function TopicSection({
  topic,
  problems,
  user,
  stats,
  progressMap,
  updateProgress,
  resetTopicProgress,
}) {
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">
            {topic}
          </h2>

          <button
            onClick={() => {
              if (
                window.confirm(
                  `Reset all ${topic} progress?`
                )
              ) {
                resetTopicProgress(topic);
              }
            }}
            className="
              px-2.5
              py-1
              text-xs
              rounded-md
              bg-zinc-800
              text-red-400
              border border-zinc-700
              hover:bg-red-900/30
              hover:border-red-700
              transition
            "
          >
            Reset
          </button>
        </div>

        {stats && (
          <span className="text-zinc-400 text-sm">
            {stats.solved}/{stats.total}
          </span>
        )}
      </div>

      {stats && (
        <div className="w-full bg-zinc-800 rounded h-2 mb-4">
          <div
            className="bg-green-500 h-2 rounded transition-all"
            style={{
              width: `${stats.percentage}%`,
            }}
          />
        </div>
      )}

      <div className="grid gap-3">
        {problems.map((problem) => (
          <ProblemCard
            key={problem._id}
            problem={problem}
            user={user}
            progressmap={progressMap}
            updateProgress={updateProgress}
          />
        ))}
      </div>
    </section>
  );
}

export default TopicSection;