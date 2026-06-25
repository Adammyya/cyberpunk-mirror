const thinkingSteps = [];

export function pushThought(step) {
  thinkingSteps.unshift({
    time: new Date().toLocaleTimeString(),
    step
  });

  if (thinkingSteps.length > 40) {
    thinkingSteps.pop();
  }
}

export function getThinkingSteps() {
  return thinkingSteps;
}

export function clearThinkingSteps() {
  thinkingSteps.length = 0;
}