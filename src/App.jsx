import { useEffect, useState } from "react";
import UserProfile from "./components/UserProfile";
import Header from "./components/Header";
import AICore from "./components/AICore";
import Weather from "./components/Weather";
import VoiceStatus from "./components/VoiceStatus";
import SystemStats from "./components/SystemStats";
import NewsFeed from "./components/NewsFeed";
import TaskPanel from "./components/TaskPanel";
import LogsPanel from "./components/LogsPanel";
import ConversationStream from "./components/ConversationStream";
import NeuralActivity from "./components/NeuralActivity";
import DiagnosticsPanel from "./components/DiagnosticsPanel";
import CognitiveProcess from "./components/CognitiveProcess";
import ThinkingTrace from "./components/ThinkingTrace";

function App() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen w-screen bg-black text-purple-300 p-4 overflow-hidden">

      {/* HEADER */}
      <Header />

      {/* MAIN GRID */}
      <div
  className="grid grid-cols-3 gap-3 h-[calc(100vh-90px)]"
  style={{
    gridTemplateRows: "1.2fr 1fr 1.2fr"
  }}
>

        {/* CLOCK */}
        <div className="border border-purple-500 rounded-lg p-4 glow min-h-0">
          <h2 className="text-2xl font-bold mb-4">
            CLOCK
          </h2>

          <p className="text-4xl font-mono">
            {time}
          </p>

          <p className="mt-4 text-lg">
            {new Date().toDateString()}
          </p>
        </div>

        {/* AI CORE */}
        <div className="border border-purple-500 rounded-lg glow flex items-center justify-center overflow-hidden min-h-0">
          <AICore />
        </div>

        {/* WEATHER */}
        <div className="border border-purple-500 rounded-lg p-4 glow min-h-0">
          <h2 className="text-2xl font-bold mb-4">
            WEATHER
          </h2>

          <Weather />
        </div>

        {/* SYSTEM STATUS */}
        <div className="border border-purple-500 rounded-lg p-4 glow min-h-0">
          <h2 className="text-2xl font-bold mb-4">
            SYSTEM STATUS
          </h2>

          <SystemStats />
        </div>

        {/* VOICE MODULE */}
        <div className="border border-purple-500 rounded-lg p-4 glow min-h-0">
          <h2 className="text-2xl font-bold mb-4">
            VOICE MODULE
          </h2>

          <VoiceStatus />
        </div>

        {/* CALENDAR */}
        <div className="border border-purple-500 rounded-lg p-4 glow">
  <UserProfile />
</div>

        {/* NEWS FEED */}
        <div className="col-span-2 border border-purple-500 rounded-lg p-4 glow overflow-hidden min-h-0">
          <h2 className="text-2xl font-bold mb-4">
            NEWS FEED
          </h2>

          <NewsFeed />
        </div>
{/* AURA DIAGNOSTICS */}
<div className="border border-purple-500 rounded-lg p-4 glow overflow-auto min-h-0">
  <h2 className="text-2xl font-bold mb-4">
    AURA DIAGNOSTICS
  </h2>

  <DiagnosticsPanel />
</div>

{/* NEURAL ACTIVITY */}
<div className="border border-purple-500 rounded-lg p-4 glow overflow-auto min-h-0">
  <h2 className="text-2xl font-bold mb-4">
    NEURAL ACTIVITY
  </h2>

  <ThinkingTrace />
</div>

        {/* TASK PANEL */}
        <div className="border border-cyan-500 rounded-lg p-4 glow">
  <ConversationStream />
</div>

      </div>
    </div>
  );
}


export default App;