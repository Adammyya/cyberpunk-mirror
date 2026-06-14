export function detectIntent(message) {
  const text = message.toLowerCase();

  if (
    text.includes("weather") ||
    text.includes("temperature") ||
    text.includes("humidity")
  ) {
    return "weather";
  }

  if (
    text.includes("news") ||
    text.includes("headline")
  ) {
    return "news";
  }

  if (
    text.includes("cpu") ||
    text.includes("ram") ||
    text.includes("battery") ||
    text.includes("system")
  ) {
    return "system";
  }

  return "chat";
}