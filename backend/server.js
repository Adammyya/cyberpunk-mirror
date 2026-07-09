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
import {addConversation, getHistory,} from "./conversationMemory.js";
import {setMode,  getMode, getPrompt,} from "./personality.js";
import { runDiagnostics } from "./diagnostics.js";
import {detectMode,} from "./cognitiveRouter.js";
import {addThought,getThoughts,} from "./thoughts.js";
import { pushThought, getThinkingSteps, clearThinkingSteps} from "./thinkingEngine.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {setReactorState,getReactorState,} from "./reactor.js";
import {setState,getState} from "./stateEngine.js";
import { extractMemory } from "./memoryExtractor.js";
import chatRouter from "./routes/chat.js";





dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


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
    const [india, world, ai] = await Promise.all([

  axios.get("https://newsapi.org/v2/top-headlines", {
    params: {
      country: "in",
      pageSize: 20,
      apiKey: process.env.NEWS_API_KEY,
    },
  }),

  axios.get("https://newsapi.org/v2/everything", {
  params: {
    q: "world",
    language: "en",
    sortBy: "publishedAt",
    pageSize: 20,
    apiKey: process.env.NEWS_API_KEY,
  },
}),
  axios.get("https://newsapi.org/v2/everything", {
    params: {
      q: "artificial intelligence OR technology OR programming OR software",
      language: "en",
      sortBy: "publishedAt",
      pageSize: 20,
      apiKey: process.env.NEWS_API_KEY,
    },
  }),

]);

const articles = [
  ...india.data.articles,
  ...world.data.articles,
  ...ai.data.articles,
];

// Remove duplicate articles by URL
const uniqueArticles = Array.from(
  new Map(
    articles
      .filter(article => article.url)
      .map(article => [article.url, article])
  ).values()
);

// Shuffle articles
const shuffledArticles = uniqueArticles.sort(() => Math.random() - 0.5);

saveNews(articles);
console.log("Total articles:", shuffledArticles.length);

res.json({
  articles: shuffledArticles,
});

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


// ======================================
// REACTOR STATE API
// ======================================

app.get("/api/state", (req, res) => {
  res.json({
    state: getState(),
  });
});

app.get("/api/reactor", (req, res) => {
  res.json({
    state: getReactorState(),
  });
});

// ======================================
// PERSONALITY API
// ======================================

app.get("/api/personality", (req, res) => {
  res.json({
    mode: getMode(),
  });
});

app.post("/api/personality", (req, res) => {
  const { mode } = req.body;

  setMode(mode);

  addLog(`COGNITIVE SHIFT -> ${mode}`);

  res.json({
    success: true,
    mode,
  });
});

// ======================================
// THOUGHTS API
// ======================================

app.get("/api/thoughts", (req, res) => {
  res.json(getThoughts());
});

// ======================================
// THINKING ENGINE API
// ======================================

app.get("/api/thinking", (req, res) => {
  res.json(getThinkingSteps());
});

app.delete("/api/thinking", (req, res) => {
  clearThinkingSteps();

  res.json({
    success: true,
  });
});

// ======================================
// LOGS API
// ======================================

app.get("/api/logs", (req, res) => {
  res.json(getLogs());
});

app.post("/api/logs", (req, res) => {

  const { message } = req.body;

  addLog(`COMMAND: ${message}`);

  res.json({
    success: true,
  });

});

// ======================================
// CONVERSATION HISTORY API
// ======================================

app.get("/api/conversation", (req, res) => {
  res.json(getHistory());
});

app.get("/api/test-conversation", (req, res) => {
  addConversation("hello", "world");

  console.log(getHistory());

  res.json(getHistory());
});

// ======================================
// DIAGNOSTICS API
// ======================================

app.get("/api/diagnostics", (req, res) => {
  const report = runDiagnostics();

  res.json(report);
});
// ======================================
// TEST JSON API
// ======================================

app.post("/testjson", (req, res) => {
  console.log(req.body);

  res.json({
    received: req.body,
  });
});
// ======================================
// SERVER
// ======================================

const PORT = process.env.PORT || 5000;
app.use("/api/chat", chatRouter);

app.listen(PORT, () => {
  console.log("");
  console.log("========================================");
  console.log("🟣 AURA CORE ONLINE");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("========================================");
});