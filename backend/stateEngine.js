let currentState = "idle";

export function setState(state) {
  currentState = state;
}

export function getState() {
  return currentState;
}