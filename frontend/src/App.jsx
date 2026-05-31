import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import TopicSection from "./components/Topic";

const API_URL = "http://localhost:5001/api";

function App() {
  const [data, setData] = useState({});
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    async function fetchProblems() {
      try {
        const res = await fetch(`${API_URL}/problems`);
        const problems = await res.json();

        const grouped = {};

        problems.forEach((problem) => {
          if (!grouped[problem.topic]) {
            grouped[problem.topic] = [];
          }

          grouped[problem.topic].push(problem);
        });

        setData(grouped);
      } catch (err) {
        console.error(err);
      }
    }

    fetchProblems();
  }, []);

  const login = async () => {
    try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
        }),
      });

      const userData = await res.json();

      setUser(userData);

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setUsername("");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        <div className="bg-zinc-900 p-8 rounded-xl">
          <h1 className="text-2xl mb-4">
            Enter Username
          </h1>

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="border border-zinc-700 bg-zinc-800 text-white p-2 rounded"
          />

          <button
            onClick={login}
            className="ml-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar
        user={user}
        logout={logout}
      />

      <main className="max-w-5xl mx-auto px-6 py-10">
        {Object.entries(data).map(([topic, problems]) => (
          <TopicSection
            key={topic}
            topic={topic}
            user={user}
            problems={problems}
          />
        ))}
      </main>
    </div>
  );
}

export default App;