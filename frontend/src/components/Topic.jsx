import ProblemCard from "./ProblemCard";

function TopicSection({ topic, problems }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4">
        {topic}
      </h2>

      <div className="grid gap-3">
        {problems.map((problem) => (
          <ProblemCard
            key={problem.name}
            problem={problem}
          />
        ))}
      </div>
    </section>
  );
}

export default TopicSection;