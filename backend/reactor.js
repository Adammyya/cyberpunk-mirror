let reactorState = "idle";

export function setReactorState(state) {
  reactorState = state;
}

export function getReactorState() {
  return reactorState;
}