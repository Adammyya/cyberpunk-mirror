import { useEffect, useState } from "react";

function SystemStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/system"
        );

        const data = await response.json();

        setStats(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchStats();

    const interval = setInterval(fetchStats, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return <p>Loading...</p>;
  }

  return (
  <div className="space-y-4">

    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>CPU</span>
        <span>{stats.cpu}%</span>
      </div>

      <div className="w-full h-2 bg-gray-900 rounded">
        <div
          className="h-2 bg-cyan-400 rounded shadow-[0_0_10px_cyan]"
          style={{ width: `${stats.cpu}%` }}
        ></div>
      </div>
    </div>

    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>RAM</span>
        <span>{stats.ram}%</span>
      </div>

      <div className="w-full h-2 bg-gray-900 rounded">
        <div
          className="h-2 bg-cyan-400 rounded shadow-[0_0_10px_cyan]"
          style={{ width: `${stats.ram}%` }}
        ></div>
      </div>
    </div>

    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>BATTERY</span>
        <span>{stats.battery}%</span>
      </div>

      <div className="w-full h-2 bg-gray-900 rounded">
        <div
          className="h-2 bg-cyan-400 rounded shadow-[0_0_10px_cyan]"
          style={{ width: `${stats.battery}%` }}
        ></div>
      </div>
    </div>

  </div>
);

}

export default SystemStats;