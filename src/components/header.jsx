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
    <div className="border-b border-cyan-500 mb-4 pb-2 flex justify-between items-center text-cyan-400">
      <div className="font-mono tracking-[4px] text-sm">
        STARK.AI // J.A.R.V.I.S // BUILD 4.1.2
      </div>

      <div className="text-3xl font-bold font-mono">
        {time}
      </div>

      <div className="flex gap-6 text-xs font-mono">
        <span>🟢 NEURAL ONLINE</span>
        <span>🟡 MEM 88%</span>
        <span>🔵 NET ACTIVE</span>
      </div>
    </div>
  );
}

export default Header;