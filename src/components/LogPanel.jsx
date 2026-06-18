import { useEffect, useState } from "react";

function LogsPanel() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = () => {
      fetch("http://localhost:5000/api/logs")
        .then((res) => res.json())
        .then((data) => setLogs(data))
        .catch(console.error);
    };

    fetchLogs();

    const interval =
      setInterval(fetchLogs, 2000);

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2 text-cyan-400 text-sm">
      {logs.length === 0 ? (
        <p>No system activity.</p>
      ) : (
        logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))
      )}
    </div>
  );
}

export default LogsPanel;