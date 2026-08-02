import { useEffect, useState } from "react";

import "./styles/glass.css";

import Header from "./components/Header";
import AICore from "./components/AICore";
import Weather from "./components/Weather";
import VoiceStatus from "./components/VoiceStatus";
import SystemStats from "./components/SystemStats";
import UserProfile from "./components/UserProfile";
import NewsFeed from "./components/NewsFeed";
import ConversationStream from "./components/ConversationStream";
import DiagnosticsPanel from "./components/DiagnosticsPanel";
import ThinkingTrace from "./components/ThinkingTrace";

import SpatialCanvas from "./aether/layout/SpatialCanvas";
import PresenceField from "./aether/layout/PresenceField";
import TopBar from "./aether/components/topbar/TopBar";
import ReactorStage from "./aether/components/reactor/ReactorStage";

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
    <SpatialCanvas>
      <PresenceField>
        <TopBar />

        <div className="min-h-screen w-screen p-4 overflow-hidden text-[var(--text-primary)]">
          <Header />

          <div
            className="grid grid-cols-3 gap-3 h-[calc(100vh-90px)]"
            style={{
              gridTemplateRows: "1.2fr 1fr 1.2fr",
            }}
          >
            {/* CLOCK */}
            <div className="aura-panel p-4 min-h-0">
              <h2 className="panel-title">CLOCK</h2>

              <p className="text-4xl font-mono">{time}</p>

              <p className="mt-4 text-lg">{new Date().toDateString()}</p>
            </div>

            {/* REACTOR */}
            <div className="aura-panel glow flex items-center justify-center overflow-hidden min-h-0">
              <ReactorStage>
                <AICore />
              </ReactorStage>
            </div>

            {/* WEATHER */}
            <div className="aura-panel p-4 min-h-0">
              <h2 className="panel-title">WEATHER</h2>
              <Weather />
            </div>

            {/* SYSTEM */}
            <div className="aura-panel p-4 min-h-0">
              <h2 className="panel-title">SYSTEM STATUS</h2>
              <SystemStats />
            </div>

            {/* VOICE */}
            <div className="aura-panel p-4 min-h-0">
              <h2 className="panel-title">VOICE MODULE</h2>
              <VoiceStatus />
            </div>

            {/* PROFILE */}
            <div className="aura-panel p-4 min-h-0">
              <UserProfile />
            </div>

            {/* NEWS */}
            <div className="aura-panel p-4 min-h-0 flex flex-col">
              <h2 className="panel-title">NEWS FEED</h2>

              <div className="flex-1 overflow-hidden">
                <NewsFeed />
              </div>
            </div>

            {/* DIAGNOSTICS */}
            <div className="aura-panel p-4 glow overflow-auto min-h-0">
              <h2 className="panel-title">AURA DIAGNOSTICS</h2>

              <DiagnosticsPanel />
            </div>

            {/* THINKING */}
            <div className="aura-panel p-4 glow overflow-auto min-h-0">
              <h2 className="panel-title">NEURAL ACTIVITY</h2>

              <ThinkingTrace />
            </div>

            {/* CONVERSATION */}
            <div className="aura-panel p-4 min-h-0 flex flex-col">
              <div className="flex-1 overflow-hidden">
                <ConversationStream />
              </div>
            </div>
          </div>
        </div>
      </PresenceField>
    </SpatialCanvas>
  );
}

export default App;