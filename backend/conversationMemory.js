const history = [];

export function addConversation(
  user,
  ai
) {
  history.push({
    user,
    ai,
  });

  if (history.length > 10) {
    history.shift();
  }
}

export function getHistory() {
  return history;
}