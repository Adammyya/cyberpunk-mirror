import { getTasks } from "./tasks.js";
import { getAllMemory } from "./memory.js";
import { getLogs } from "./logs.js";

export function runDiagnostics() {
  const tasks = getTasks();
  const memory = getAllMemory();
  const logs = getLogs();

  return {
    core: "ONLINE",
    memory: "ONLINE",
    tasks: "ONLINE",
    logs: "ONLINE",

    taskCount: tasks.length,

    memoryEntries:
      Object.keys(memory).length,

    logCount: logs.length,

    health: 98,
  };
}