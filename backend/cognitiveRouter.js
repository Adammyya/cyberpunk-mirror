export function detectMode(message) {
  const text = message.toLowerCase();

  // ENGINEER

  if (
    text.includes("code") ||
    text.includes("bug") ||
    text.includes("react") ||
    text.includes("node") ||
    text.includes("javascript") ||
    text.includes("server")
  ) {
    return "engineer";
  }

  // MENTOR

  if (
    text.includes("teach") ||
    text.includes("explain") ||
    text.includes("understand") ||
    text.includes("learn")
  ) {
    return "mentor";
  }

  // RESEARCH

  if (
    text.includes("compare") ||
    text.includes("analysis") ||
    text.includes("research") ||
    text.includes("pros and cons")
  ) {
    return "research";
  }

  // CREATIVE

  if (
    text.includes("idea") ||
    text.includes("design") ||
    text.includes("invent") ||
    text.includes("creative")
  ) {
    return "creative";
  }

  return "default";
}