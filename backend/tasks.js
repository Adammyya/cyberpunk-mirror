const tasks = [];

export function addTask(task) {
  tasks.push(task);
}

export function getTasks() {
  return tasks;
}

export function deleteTask(index) {
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    return true;
  }

  return false;
}