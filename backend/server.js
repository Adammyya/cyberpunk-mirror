import express from "express";
import cors from "cors";
import os from "os";
import si from "systeminformation";
import axios from "axios";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { detectIntent } from "./router.js";
import { getWeather } from "./weatherTool.js";
import { getSystemInfo } from "./systemTool.js";
import { saveNews, getNews } from "./newsMemory.js";
import {addTask, getTasks, deleteTask,} from "./tasks.js";
import {remember, recall, getAllMemory,} from "./memory.js";
import {addLog, getLogs,} from "./logs.js";



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

console.log("News API Loaded:", !!process.env.NEWS_API_KEY);
console.log("Gemini API Loaded:", !!process.env.GEMINI_API_KEY);


// ======================================
// SYSTEM STATUS API
// ======================================

app.get("/api/system", async (req, res) => {
  try {
    const load = await si.currentLoad();
    const battery = await si.battery();

    res.json({
      cpu: Number(load.currentLoad.toFixed(1)),
      ram: Number(
        (
          ((os.totalmem() - os.freemem()) /
            os.totalmem()) *
          100
        ).toFixed(1)
      ),
      battery: battery.hasBattery
        ? battery.percent
        : 100,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get system stats",
    });
  }
});


// ======================================
// NEWS API
// ======================================

app.get("/api/news", async (req, res) => {
  try {
    const response = await axios.get(
      "https://newsapi.org/v2/everything",
      {
        params: {
          q: "artificial intelligence OR technology OR programming",
          language: "en",
          sortBy: "publishedAt",
          pageSize: 8,
          apiKey: process.env.NEWS_API_KEY,
        },
      }
    );

    // Save articles to memory for Jarvis
    saveNews(response.data.articles);

    res.json(response.data);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch news",
    });
  }
});


// ======================================
// GEMINI CHAT API
// ======================================

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const text = message.toLowerCase();

    // =====================
    // TASKS
    // =====================
    console.log("ADD TASK ROUTE HIT");

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
      addLog(
  `Task added: ${task}`
);

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

    // =====================
    // MEMORY
    // =====================
    const rememberMatch =
  message.match(
    /remember my (.+?) is (.+)/i
  );

if (rememberMatch) {
  const key =
    rememberMatch[1].trim();

  const value =
    rememberMatch[2].trim();

  remember(key, value);
  addLog(
  `Memory updated: ${key}`
);

  return res.json({
    reply:
      `I will remember that your ${key} is ${value}.`,
  });
}
const recallMatch =
  message.match(
    /what is my (.+)/i
  );

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
  text.includes(
    "what do you know about me"
  )
) {
  const memory =
    getAllMemory();

  const entries =
    Object.entries(memory);

  if (!entries.length) {
    return res.json({
      reply:
        "I don't know anything about you yet.",
    });
  }

  const profile =
    entries
      .map(
        ([key, value]) =>
          `${key}: ${value}`
      )
      .join("\n");

  return res.json({
    reply:
      `Here's what I know:\n\n${profile}`,
  });
}


    const nameMatch =
      message.match(/my name is (.+)/i);

    if (nameMatch) {
      const name =
        nameMatch[1].trim();

      remember("name", name);

      return res.json({
        reply: `Nice to meet you, ${name}. I'll remember that.`,
      });
    }

    if (
      text.includes("what is my name") ||
      text.includes("what's my name")
    ) {
      const name = recall("name");

      return res.json({
        reply: name
          ? `Your name is ${name}.`
          : "I don't know your name yet.",
      });
    }

    // =====================
    // INTENT ROUTER
    // =====================

    const intent =
      detectIntent(message);

    console.log(
      "MESSAGE:",
      message
    );
    console.log(
      "INTENT:",
      intent
    );

    // =====================
    // WEATHER
    // =====================

    if (intent === "weather") {
      const weather =
        await getWeather();
        addLog(
  "Weather request processed"
);

      return res.json({
        reply:
          `Current temperature is ${weather.temperature}°C. ` +
          `Wind speed is ${weather.windspeed} km/h.`,
      });
    }

    // =====================
    // SYSTEM
    // =====================

    if (intent === "system") {
      const stats =
        await getSystemInfo();

      return res.json({
        reply:
          `CPU usage is ${stats.cpu}% . ` +
          `RAM usage is ${stats.ram}% . ` +
          `Battery is ${stats.battery}%.`,
      });
    }

    // =====================
    // NEWS
    // =====================

    if (intent === "news") {
      const news = getNews();

      if (!news.length) {
        return res.json({
          reply:
            "No news available.",
        });
      }

      return res.json({
        reply:
          `Top headline: ${news[0].title}`,
      });
    }

    // =====================
    // GEMINI
    // =====================

    try {
      const memory = getAllMemory();

const tasks = getTasks();

const memoryContext =
  Object.entries(memory)
    .map(
      ([key, value]) =>
        `${key}: ${value}`
    )
    .join("\n");

const taskContext =
  tasks.length
    ? tasks
        .map(
          (task, index) =>
            `${index + 1}. ${task}`
        )
        .join("\n")
    : "No active tasks";
      const response =
        await ai.models.generateContent({
          model:
            "gemini-2.0-flash-lite",
          contents: `
You are JARVIS, an advanced AI assistant inspired by Iron Man.

You are intelligent, concise, confident, and helpful.

You have access to the user's profile and tasks.

USER PROFILE:
${memoryContext}

ACTIVE TASKS:
${taskContext}

Use this information whenever it is relevant.

Speak naturally like a real assistant.

User: ${message}
`,
        });

      return res.json({
        reply: response.text,
      });

    } catch (error) {
      console.error(
        "GEMINI ERROR:"
      );
      console.error(error);

      return res.json({
        reply:
          "I'm currently experiencing heavy load from the AI core. Please try again in a few moments.",
      });
    }

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message,
    });
  }
});


// ======================================
// TEST GEMINI
// ======================================

app.get("/api/test-ai", async (req, res) => {
  try {
    const response =
      await ai.models.generateContent({
        model: "gemini-2.0-flash-lite",
        contents: "Who are you?",
      });

    res.json({
      reply: response.text,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});


// ======================================
// MEMORY API
// ======================================

app.get("/api/memory", (req, res) => {
  const memory = getAllMemory();

  res.json(memory);
});

app.get("/api/tasks", (req, res) => {
  res.json(getTasks());
});

// ======================================
// LOGS API
// ======================================

app.get("/api/logs", (req, res) => {
  res.json(getLogs());
});

// ======================================
// SERVER
// ======================================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
}); 