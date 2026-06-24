import { useEffect, useState } from "react";

function NeuralActivity() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/logs"
      );

      const data = await response.json();

      setLogs(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLogs();

    const interval =
      setInterval(fetchLogs, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full overflow-auto">

      <div className="space-y-2 text-sm">
        {logs.map((log, index) => (
          <div
            key={index}
            className="border-b border-cyan-900 pb-2"
          >
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NeuralActivity;