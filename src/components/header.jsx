import { useEffect, useState } from "react";

function Header() {
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
    <div
  className="mb-4 pb-2 flex justify-between items-center"
  style={{
    borderBottom: "1px solid rgba(168,85,247,.5)",
    color: "var(--aura-white)"
  }}
>
      <div className="font-mono tracking-[4px] text-sm">
  AURA OS // Adaptive Unified Reasoning Assistant
</div>

      <div className="text-3xl font-bold font-mono">
        {time}
      </div>

      <div className="flex gap-6 text-xs font-mono">
        <span>◉ CORE ONLINE</span>
<span>◉ MEMORY ACTIVE</span>
<span>◉ VOICE READY</span>
</div>
    </div>
  );
}

export default Header;