import { useEffect, useState } from "react";

function PersonalityStatus() {
  const [mode, setMode] =
    useState("default");

  useEffect(() => {
    fetchMode();

    const timer =
      setInterval(
        fetchMode,
        3000
      );

    return () =>
      clearInterval(timer);
  }, []);

  async function fetchMode() {
    try {
      const res = await fetch(
        "http://localhost:5000/api/personality"
      );

      const data =
        await res.json();

      setMode(data.mode);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mt-2 text-center">
      <p className="text-xs text-purple-400 tracking-widest">
        COGNITIVE MODE
      </p>

      <h3 className="text-lg font-bold text-white">
        {mode.toUpperCase()}
      </h3>
    </div>
  );
}

export default PersonalityStatus;