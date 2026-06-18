const logs = [];

export function addLog(message) {
  const time = new Date()
    .toLocaleTimeString();

  logs.unshift(
    `[${time}] ${message}`
  );

  if (logs.length > 20) {
    logs.pop();
  }
}

export function getLogs() {
  return logs;
}