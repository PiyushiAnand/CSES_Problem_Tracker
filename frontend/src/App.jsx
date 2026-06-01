import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import TopicSection from "./components/Topic";

const API_URL = "http://localhost:5001/api";

function App() {
  const [data, setData] = useState({});
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState([]);
  const [progressMap, setProgressMap] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
  async function fetchProblems() {
    try {
      const res = await fetch(
        `${API_URL}/problems`
      );

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

  const fetchProgress = async () => {
  const res = await fetch(
    `${API_URL}/userproblems/user/${user._id}`
  );

  const data = await res.json();

  const map = {};

  data.forEach((p) => {
    map[p.problem._id] = p;
  });
  // console.log("Fetched user progress:", map);
  setProgressMap(map);
};

  const fetchStats = async () => {
  if (!user) return;

  try {
    const res = await fetch(
      `${API_URL}/userproblems/stats/${user._id}`
    );

    if (!res.ok) {
      console.error(
        "Failed to fetch stats:",
        await res.text()
      );
      return;
    }

    const statsData = await res.json();

    setStats(
      Array.isArray(statsData)
        ? statsData
        : []
    );
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  if (user) {
    fetchProgress();
    fetchStats();
  }
}, [user]);

  const login = async () => {
    try {
      const res = await fetch(
        `${API_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            username,
          }),
        }
      );

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
    setStats([]);
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
            onChange={(e) =>
              setUsername(e.target.value)
            }
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
        {Object.entries(data).map(
          ([topic, problems]) => {
            const topicStats =
              stats.find(
                (s) => s.topic === topic
              ) || {
                solved: 0,
                total: problems.length,
                percentage: 0,
              };

            return (
              <TopicSection
                key={topic}
                topic={topic}
                problems={problems}
                user={user}
                stats={topicStats}
                refreshStats={fetchStats}
                progressMap={progressMap}
              />
            );
          }
        )}
      </main>
    </div>
  );
}

export default App;