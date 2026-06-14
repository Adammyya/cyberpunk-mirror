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

    const intent = detectIntent(message);
    console.log("MESSAGE:", message);
console.log("INTENT:", intent);
if (intent === "weather") {
  console.log("ENTERED WEATHER ROUTE");
}

    // WEATHER
    if (intent === "weather") {
  try {
    console.log("CALLING getWeather()");

    const weather = await getWeather();

    console.log(weather);

    return res.json({
      reply: weather,
    });
  } catch (err) {
    console.error("WEATHER ERROR:");
    console.error(err);

    return res.status(500).json({
      error: err.message,
    });
  }
}

    // SYSTEM
    if (intent === "system") {
      const stats = await getSystemInfo();

      return res.json({
        reply: `CPU usage is ${stats.cpu} percent. RAM usage is ${stats.ram} percent. Battery is ${stats.battery} percent.`,
      });
    }

    // NEWS
    if (intent === "news") {
      const news = getNews();

      if (!news.length) {
        return res.json({
          reply: "No news available.",
        });
      }

      return res.json({
        reply: `Top headline: ${news[0].title}`,
      });
    }

    // GEMINI FALLBACK
    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
      });

    res.json({
      reply: response.text,
    });

  } catch (error) {
    console.error("GEMINI ERROR:");
    console.error(error);

    res.status(500).json({
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
        model: "gemini-2.5-flash",
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
// SERVER
// ======================================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});