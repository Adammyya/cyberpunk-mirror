const memory = {};

export function remember(key, value) {
  memory[key] = value;
}

export function recall(key) {
  return memory[key];
}

export function getAllMemory() {
  return memory;
}