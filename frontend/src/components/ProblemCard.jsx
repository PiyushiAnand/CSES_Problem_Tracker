function ProblemCard({ problem }) {
  return (
    <a
      href={problem.link}
      target="_blank"
      rel="noreferrer"
      className="
        block
        bg-zinc-900
        border border-zinc-800
        rounded-xl
        p-4
        hover:bg-zinc-800
        hover:border-zinc-700
        transition
      "
    >
      <p className="text-lg font-medium">
        {problem.name}
      </p>
    </a>
  );
}

export default ProblemCard;