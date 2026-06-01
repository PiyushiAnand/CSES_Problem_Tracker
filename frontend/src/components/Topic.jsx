import ProblemCard from "./ProblemCard";

function TopicSection({
  topic,
  problems,
  user,
  stats,
  refreshStats,
  progressMap,
}) {
  //  console.log(progressMap);
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold">
          {topic}
        </h2>

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
            refreshStats={refreshStats}
          />
        ))}
      </div>
    </section>
  );
}

export default TopicSection;