import express from "express";
import { detectIntent } from "../router.js";

import { getWeather } from "../weatherTool.js";
import { getSystemInfo } from "../systemTool.js";
import { getNews } from "../newsMemory.js";

import {
  addTask,
  getTasks,
  deleteTask,
} from "../tasks.js";

import {
  remember,
  recall,
  getAllMemory,
} from "../memory.js";

import {
  addLog,
} from "../logs.js";

import {
  addConversation,
} from "../conversationMemory.js";

import {
  setMode,
  getMode,
  getPrompt,
} from "../personality.js";

import {
  detectMode,
} from "../cognitiveRouter.js";

import {
  addThought,
} from "../thoughts.js";

import {
  pushThought,
} from "../thinkingEngine.js";

import {
  setState,
} from "../stateEngine.js";

import {
  extractMemory,
} from "../memoryExtractor.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    extractMemory(message);

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const text = message.toLowerCase();

    // =========================
    // COGNITIVE MODE
    // =========================

    const mode = detectMode(message);

    setMode(mode);

    addLog(`COGNITIVE SHIFT -> ${mode}`);

    // =========================
    // TASKS
    // =========================

    if (text.startsWith("add task")) {

      const task = message
        .replace(/add task/i, "")
        .trim();

      if (!task) {
        return res.json({
          reply: "Please provide a task.",
        });
      }

      addTask(task);

      addLog(`Task added: ${task}`);

      return res.json({
        reply: `Task added: ${task}`,
      });
    }

    if (
      text.includes("show task") ||
      text.includes("show tasks") ||
      text.includes("show my task") ||
      text.includes("show my tasks")
    ) {

      const tasks = getTasks();

      if (!tasks.length) {
        return res.json({
          reply: "You have no tasks.",
        });
      }

      return res.json({
        reply: tasks
          .map(
            (task, index) =>
              `${index + 1}. ${task}`
          )
          .join("\n"),
      });
    }

    const deleteMatch =
      text.match(/delete task (\d+)/);

    if (deleteMatch) {

      const taskNumber =
        parseInt(deleteMatch[1]) - 1;

      const success =
        deleteTask(taskNumber);

      if (success) {
        addLog(
          `Task deleted: #${taskNumber + 1}`
        );
      }

      return res.json({
        reply: success
          ? "Task deleted."
          : "Task not found.",
      });
    }
        // =========================
    // MEMORY
    // =========================

    const rememberMatch =
      message.match(/remember my (.+?) is (.+)/i);

    if (rememberMatch) {

      const key =
        rememberMatch[1].trim();

      const value =
        rememberMatch[2].trim();

      remember(key, value);

      addLog(`Memory updated: ${key}`);

      return res.json({
        reply:
          `I will remember that your ${key} is ${value}.`,
      });
    }

    const recallMatch =
      message.match(/what is my (.+)/i);

    if (recallMatch) {

      const key =
        recallMatch[1].trim();

      const value =
        recall(key);

      return res.json({
        reply: value
          ? `Your ${key} is ${value}.`
          : `I don't know your ${key} yet.`,
      });
    }

    if (
      text.includes("what do you know about me")
    ) {

      const memory =
        getAllMemory();

      const profile =
        Object.entries(memory)
          .map(
            ([key, value]) =>
              `${key}: ${value}`
          )
          .join("\n");

      return res.json({
        reply:
          profile.length
            ? `Here's what I know:\n\n${profile}`
            : "I don't know anything about you yet.",
      });
    }

    // =========================
    // NAME MEMORY
    // =========================

    const nameMatch =
      message.match(/my name is (.+)/i);

    if (nameMatch) {

      const name =
        nameMatch[1].trim();

      remember("name", name);

      return res.json({
        reply:
          `Nice to meet you, ${name}. I'll remember that.`,
      });
    }

    if (
      text.includes("what is my name") ||
      text.includes("what's my name")
    ) {

      const name =
        recall("name");

      return res.json({
        reply:
          name
            ? `Your name is ${name}.`
            : "I don't know your name yet.",
      });
    }
        // =========================
    // INTENT ROUTER
    // =========================

    const intent = detectIntent(message);

    console.log("MESSAGE:", message);
    console.log("INTENT:", intent);

    // -------------------------
    // WEATHER
    // -------------------------

    if (intent === "weather") {

      const weather = await getWeather();

      addLog("Weather request processed");

      return res.json({
        reply:
          `Current temperature is ${weather.temperature}°C. Wind speed is ${weather.windspeed} km/h.`,
      });

    }

    // -------------------------
    // SYSTEM
    // -------------------------

    if (intent === "system") {

      const stats = await getSystemInfo();

      addLog("System status requested");

      return res.json({
        reply:
          `CPU usage is ${stats.cpu}%. RAM usage is ${stats.ram}%. Battery is ${stats.battery}%.`,
      });

    }

    // -------------------------
    // NEWS
    // -------------------------

    if (intent === "news") {

      const news = getNews();

      addLog("News requested");

      if (!news.length) {
        return res.json({
          reply: "No news available.",
        });
      }

      return res.json({
        reply: `Top headline: ${news[0].title}`,
      });

    }

    // -------------------------
    // MANUAL PERSONALITY MODES
    // -------------------------

    if (text.includes("activate engineer mode")) {

      setMode("engineer");

      return res.json({
        reply: "Engineer Mode activated.",
      });

    }

    if (text.includes("activate mentor mode")) {

      setMode("mentor");

      return res.json({
        reply: "Mentor Mode activated.",
      });

    }

    if (text.includes("activate research mode")) {

      setMode("research");

      return res.json({
        reply: "Research Mode activated.",
      });

    }

    if (text.includes("activate creative mode")) {

      setMode("creative");

      return res.json({
        reply: "Creative Mode activated.",
      });

    }
        // =========================
    // COGNITIVE PIPELINE
    // =========================

    addLog("Intent analysis started");

    const personalityPrompt = getPrompt();

    addLog(`Cognitive mode selected: ${getMode()}`);

    pushThought("🧠 Understanding your request...");

    pushThought("🧠 Identifying your intent...");

    pushThought("🧠 Searching relevant memories...");

    const memory = getAllMemory();

    pushThought("📋 Reviewing active objectives...");

    const tasks = getTasks();

    addLog("Relevant memories retrieved");

    addLog("Active tasks synchronized");

    pushThought("🧠 Integrating knowledge and memory...");

    addLog("Reasoning context assembled");

    const context = `
MEMORY:
${JSON.stringify(memory, null, 2)}

TASKS:
${tasks.join("\n")}

CURRENT USER MESSAGE:
${message}
`;

    addLog("Reasoning engine activated");

    addThought("Analyzing user query...");

    addThought(`Selected ${getMode().toUpperCase()} mode.`);

    pushThought("⚡ Activating reasoning engine...");

    console.log("================================");
    console.log("MESSAGE:");
    console.log(message);

    console.log("================================");
    console.log("MODE:");
    console.log(getMode());

    console.log("================================");
    console.log("FULL PROMPT:");
    console.log(`
${personalityPrompt}

CURRENT MODE:
${getMode()}

${context}
`);

    setState("thinking");

    await new Promise(resolve =>
      setTimeout(resolve, 3000)
    );

    const response =
      await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: `
${personalityPrompt}

CURRENT MODE:
${getMode()}

${context}
`

      });
      console.log("========== RAW GEMINI RESPONSE ==========");
console.dir(response, { depth: null });
console.log("========================================");
      console.log("✅ Gemini responded");
console.log(response);

    pushThought("✨ Synthesizing response...");

    addThought("Response generated.");

    addLog("Response synthesis complete");

    pushThought("🧠 Consolidating new memory...");
    const reply = response.text;

console.log("✅ Gemini responded");
console.log("REPLY:");
console.log(reply);

pushThought("✨ Synthesizing response...");
addThought("Response generated.");
addLog("Response synthesis complete");

pushThought("🧠 Consolidating new memory...");

addConversation(
  message,
  reply
);

setState("idle");

return res.json({
  reply,
});

} catch (error) {

  setState("error");

  console.error("GEMINI ERROR:");
  console.error(error);

  return res.status(500).json({
    reply:
      "I'm currently experiencing heavy load from the AI core. Please try again in a few moments.",
  });

}

});

export default router;