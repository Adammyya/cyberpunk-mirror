import { useEffect, useState } from "react";
import "./styles/glass.css";
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
    <div className="min-h-screen w-screen p-4 overflow-hidden text-[var(--text-primary)]">

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
        <div className="aura-panel p-4 min-h-0">
          <h2 className="panel-title">
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
        <div className="aura-panel glow flex items-center justify-center overflow-hidden min-h-0">
          <AICore />
        </div>

        {/* WEATHER */}
        <div className="aura-panel p-4 min-h-0">
          <h2 className="panel-title">
            WEATHER
          </h2>

          <Weather />
        </div>

        {/* SYSTEM STATUS */}
        <div className="aura-panel p-4 min-h-0">
          <h2 className="panel-title">
            SYSTEM STATUS
          </h2>

          <SystemStats />
        </div>

        {/* VOICE MODULE */}
        <div className="aura-panel p-4 min-h-0">
          <h2 className="panel-title">
            VOICE MODULE
          </h2>

          <VoiceStatus />
        </div>

        {/* CALENDAR */}
        <div className="aura-panel p-4 min-h-0">
  <UserProfile />
</div>

        {/* NEWS FEED */}
        <div className="aura-panel p-4 min-h-0 flex flex-col">
          <h2 className="panel-title">
            NEWS FEED
          </h2>
           <div className="flex-1 overflow-hidden">
        <NewsFeed />
    </div>

          <NewsFeed />
        </div>
{/* AURA DIAGNOSTICS */}
<div className="aura-panel p-4 glow overflow-auto min-h-0">
  <h2 className="panel-title">
    AURA DIAGNOSTICS
  </h2>

  <DiagnosticsPanel />
</div>

{/* NEURAL ACTIVITY */}
<div className="aura-panel p-4 glow overflow-auto min-h-0">
  <h2 className="panel-title">
    NEURAL ACTIVITY
  </h2>

  <ThinkingTrace />
</div>

        {/* TASK PANEL */}
        <div className="aura-panel p-4 min-h-0 flex flex-col">

    

    <div className="flex-1 overflow-hidden">
        <ConversationStream />
    </div>

</div>

      </div>
    </div>
  );
}


export default App;