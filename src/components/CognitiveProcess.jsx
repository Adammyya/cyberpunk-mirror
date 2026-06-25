import { useEffect, useState } from "react";

function CognitiveProcess() {
  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    fetchThoughts();

    const timer = setInterval(fetchThoughts, 1000);

    return () => clearInterval(timer);
  }, []);

  async function fetchThoughts() {
    try {
      const res = await fetch(
        "http://localhost:5000/api/thoughts"
      );

      const data = await res.json();

      setThoughts(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-3 text-sm font-mono overflow-y-auto h-full">
      {thoughts.map((thought, index) => (
        <div
          key={index}
          className="border-l-2 border-purple-500 pl-3"
        >
          <p className="text-xs text-purple-400">
            {thought.time}
          </p>

          <p className="text-white">
            {thought.message}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CognitiveProcess;