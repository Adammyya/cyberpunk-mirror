import "./AICore.css";

function AICore() {
  return (
    <div className="ai-core-container">

      <div className="reactor">
        <div className="hud-ring"></div>

        <div className="radar-sweep"></div>

        <div className="ring ring1"></div>
        <div className="ring ring2"></div>
        <div className="ring ring3"></div>
        <div className="ring ring4"></div>

        <div className="scan-line"></div>
        <div className="crosshair horizontal"></div>
<div className="crosshair vertical"></div>

        <div className="core"></div>


      </div>

      <h2 className="core-title">JARVIS CORE</h2>

      <div className="core-status">
        <p>SYSTEM ONLINE</p>
        <p>VOICE MODULE READY</p>
        <p>MEMORY OS STANDBY</p>

        <p className="text-cyan-500 mt-4 tracking-widest">
          ALL SYSTEMS NOMINAL
        </p>
      </div>

      <div className="core-metrics">

        <div>
          <h3>07</h3>
          <p>TASKS</p>
        </div>

        <div>
          <h3>03</h3>
          <p>EVENTS</p>
        </div>

        <div>
          <h3>12</h3>
          <p>ALERTS</p>
        </div>

        <div>
          <h3>99%</h3>
          <p>UPTIME</p>
        </div>

      </div>

    </div>
  );
}

export default AICore;