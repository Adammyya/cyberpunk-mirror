import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);

const TASK_FILE =
  path.join(__dirname, "tasks.json");

function loadTasks() {
  try {
    const data =
      fs.readFileSync(
        TASK_FILE,
        "utf8"
      );

    return JSON.parse(data);

  } catch {
    return [];
  }
}

function saveTasks(tasks) {
  fs.writeFileSync(
    TASK_FILE,
    JSON.stringify(tasks, null, 2)
  );
}

export function addTask(task) {
  const tasks = loadTasks();

  tasks.push(task);

  saveTasks(tasks);
}

export function getTasks() {
  return loadTasks();
}

export function deleteTask(index) {
  const tasks = loadTasks();

  if (
    index >= 0 &&
    index < tasks.length
  ) {
    tasks.splice(index, 1);

    saveTasks(tasks);

    return true;
  }

  return false;
}