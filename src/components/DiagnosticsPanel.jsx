import { useEffect, useState } from "react";

function DiagnosticsPanel() {
  const [report, setReport] =
    useState(null);

  useEffect(() => {
    fetchDiagnostics();

    const timer =
      setInterval(
        fetchDiagnostics,
        5000
      );

    return () =>
      clearInterval(timer);
  }, []);

  async function fetchDiagnostics() {
    try {
      const res = await fetch(
        "http://localhost:5000/api/diagnostics"
      );

      const data =
        await res.json();

      setReport(data);
    } catch (error) {
      console.error(error);
    }
  }

  if (!report)
    return (
      <p>Running diagnostics...</p>
    );

  return (
    <div className="text-sm space-y-2">
      <p>
        CORE ............
        {report.core}
      </p>

      <p>
        MEMORY ..........
        {report.memory}
      </p>

      <p>
        TASKS ...........
        {report.tasks}
      </p>

      <p>
        LOGS ............
        {report.logs}
      </p>

      <hr className="border-purple-500 my-2" />

      <p>
        TASK COUNT ......
        {report.taskCount}
      </p>

      <p>
        MEMORY ENTRIES ..
        {report.memoryEntries}
      </p>

      <p>
        LOG COUNT .......
        {report.logCount}
      </p>

      <hr className="border-purple-500 my-2" />

      <p className="text-green-400">
        HEALTH ..........
        {report.health}%
      </p>
    </div>
  );
}

export default DiagnosticsPanel;