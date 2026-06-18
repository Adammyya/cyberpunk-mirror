import { useEffect, useState } from "react";

function TaskPanel() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        TASKS
      </h2>

      <div className="space-y-2 text-cyan-300">
        {tasks.length === 0 ? (
          <p>No active tasks.</p>
        ) : (
          tasks.map((task, index) => (
            <p key={index}>
              {index + 1}. {task}
            </p>
          ))
        )}
      </div>

      <div className="mt-4 text-xs text-cyan-500">
        {tasks.length} ACTIVE TASKS
      </div>
    </div>
  );
}

export default TaskPanel;