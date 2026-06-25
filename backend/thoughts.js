const thoughts = [];

export function addThought(message) {
  thoughts.unshift({
    time: new Date().toLocaleTimeString(),
    message,
  });

  if (thoughts.length > 25) {
    thoughts.pop();
  }
}

export function getThoughts() {
  return thoughts;
}

export function clearThoughts() {
  thoughts.length = 0;
}