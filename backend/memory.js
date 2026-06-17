import fs from "fs";

const MEMORY_FILE = "./memory.json";

function loadMemory() {
  try {
    const data = fs.readFileSync(
      MEMORY_FILE,
      "utf8"
    );

    return JSON.parse(data);

  } catch {
    return {};
  }
}

function saveMemory(memory) {
  console.log("WRITING TO FILE");
  fs.writeFileSync(
    MEMORY_FILE,
    JSON.stringify(memory, null, 2)
  );
}

export function remember(key, value) {
  
  console.log("SAVING MEMORY:", key, value);

  const memory = loadMemory();

  memory[key] = value;

  saveMemory(memory);
}

export function recall(key) {
  const memory = loadMemory();

  return memory[key];
}

export function getAllMemory() {
  return loadMemory();
}