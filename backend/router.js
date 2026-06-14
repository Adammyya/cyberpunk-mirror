console.log("ROUTER VERSION 2 LOADED");
export function detectIntent(message) {
  const text = message.toLowerCase();

  if (
    /\b(weather|temperature|humidity|forecast)\b/.test(text)
  ) {
    return "weather";
  }

  if (
    /\b(news|headline|headlines)\b/.test(text)
  ) {
    return "news";
  }

  if (
    /\b(cpu|ram|battery|system)\b/.test(text)
  ) {
    return "system";
  }

  return "chat";
}