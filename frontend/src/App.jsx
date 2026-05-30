import data from "../../topics.json";
import Navbar from "./components/Navbar";
import TopicSection from "./components/Topic";

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-10">
        {Object.entries(data).map(([topic, problems]) => (
          <TopicSection
            key={topic}
            topic={topic}
            problems={problems}
          />
        ))}
      </main>
    </div>
  );
}

export default App;