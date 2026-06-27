import "./AICore.css";
import { useEffect, useState } from "react";
import PersonalityStatus from "./PersonalityStatus";

function AICore() {
  const [currentMode, setCurrentMode] = useState("default");

  // Reactor state
  const [reactorState, setReactorState] = useState("idle");
  useEffect(() => {
  const fetchReactorState = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/state"
      );

      const data = await response.json();

      setReactorState(data.state);
    } catch (error) {
      console.error(
        "Error fetching reactor state:",
        error
      );
    }
  };

  fetchReactorState();

  const interval = setInterval(
    fetchReactorState,
    300
  );

  return () => clearInterval(interval);
}, []);

  // Temporary test
  useEffect(() => {
    setReactorState("thinking");

    const timer = setTimeout(() => {
      setReactorState("idle");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Fetch personality mode
  useEffect(() => {
    const fetchMode = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/personality"
        );

        const data = await response.json();

        setCurrentMode(data.mode);
      } catch (error) {
        console.error(
          "Error fetching personality mode:",
          error
        );
      }
    };

    fetchMode();

    const interval = setInterval(fetchMode, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ai-core-container">
      <div className={`reactor ${reactorState}`}>
        <div className="energy-halo"></div>
        <div className="pulse-wave"></div>
        <div className="hud-ring"></div>

        <div className="ring ring1"></div>
        <div className="ring ring2"></div>
        <div className="ring ring3"></div>
        <div className="ring ring4"></div>

        <div className="scan-line"></div>

        <div className="core"></div>
        <div className="particle p1"></div>
<div className="particle p2"></div>
<div className="particle p3"></div>
<div className="particle p4"></div>
<div className="particle p5"></div>
<div className="particle p6"></div>

        <div className="node node1"></div>
        <div className="node node2"></div>
        <div className="node node3"></div>
        <div className="node node4"></div>
        <div className="node node5"></div>
        <div className="node node6"></div>
      </div>

      <h2 className="core-title">
        AURA
        <p
  style={{
    color: "#00ffff",
    marginTop: "8px",
    letterSpacing: "3px",
  }}
>
  STATE : {reactorState.toUpperCase()}
</p>
      </h2>

      <PersonalityStatus currentMode={currentMode} />

      <div className="core-status">
        <p>CONSCIOUSNESS ACTIVE</p>
        <p>VOICE INTERFACE READY</p>
        <p>MEMORY MATRIX ONLINE</p>

        <p className="text-cyan-500 mt-4 tracking-widest">
          AURA CONSCIOUSNESS STABLE
        </p>

        <p
          style={{
            color: "#c084fc",
            fontWeight: "bold",
            marginTop: "8px",
          }}
        >
          COGNITIVE MODE
        </p>

        <p
          style={{
            color: "#ffffff",
            letterSpacing: "3px",
          }}
        >
          {currentMode.toUpperCase()}
        </p>
      </div>

      <div className="core-metrics">
        <div>
          <h3>MODULES</h3>
        </div>

        <div>
          <h3>MEMORY</h3>
        </div>

        <div>
          <h3>LOGS</h3>
        </div>

        <div>
          <h3>ONLINE</h3>
        </div>
      </div>

      <div className="text-xs tracking-[6px] mt-3">
        CREATED BY Adamya Pandey 
      </div>
    </div>
  );
}

export default AICore;