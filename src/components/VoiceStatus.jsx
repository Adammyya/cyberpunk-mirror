import { useState } from "react";
import { speakResponse } from "../utils/speech";

function VoiceStatus() {
  const [status, setStatus] = useState("STANDBY");
  const [command, setCommand] = useState("");
  const [reply, setReply] = useState("");


  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatus("NOT SUPPORTED");
      return;
    }

    const recognition = new SpeechRecognition();

    // Auto-detect browser language
    recognition.lang = navigator.language;
    recognition.interimResults = false;
    recognition.continuous = false;

    setStatus("LISTENING...");

    recognition.start();

    recognition.onresult = async (event) => {
  const text =
    event.results[0][0].transcript;

  setCommand(text);

  setStatus("PROCESSING...");

  try {
    const response = await fetch(
      "http://localhost:5000/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      }
    );

    const data =
      await response.json();

    setReply(data.reply);

    const speech =
      new SpeechSynthesisUtterance(
        data.reply
      );

    speech.lang = "auto";

    window.speechSynthesis.speak(
      speech
    );

    setStatus("RESPONDED");
  } catch (error) {
    console.error(error);

    setStatus("ERROR");
  }
};

    recognition.onerror = () => {
      setStatus("ERROR");
    };

    recognition.onend = () => {
      setTimeout(() => {
        setStatus("STANDBY");
      }, 2500);
    };
  };

  return (
    <div>
      <div className="flex justify-between mb-4 text-sm">
        <span>VOICE // MODULE</span>
        <span>{status}</span>
      </div>

      {/* Waveform */}
      <div className="flex justify-center items-end gap-1 h-14 mb-5">
        <div className="wave-bar"></div>
        <div className="wave-bar wave2"></div>
        <div className="wave-bar wave3"></div>
        <div className="wave-bar wave4"></div>
        <div className="wave-bar wave5"></div>
      </div>

      <button
        onClick={startListening}
        className="border border-cyan-400 px-3 py-1 rounded hover:bg-cyan-400 hover:text-black transition"
      >
        ACTIVATE MIC
      </button>

      <div className="mt-4 text-sm">
        <p>AWAITING COMMAND</p>

        {command && (
          <div className="mt-3">
            <p className="text-cyan-500 text-xs mb-1">
              LAST COMMAND
            </p>
            {reply && (
  <div className="mt-4">
    <p className="text-cyan-500 text-xs">
      JARVIS RESPONSE
    </p>

    <p className="text-cyan-300 mt-1">
      {reply}
    </p>
  </div>
)}

            <p className="text-cyan-300">
              {command}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VoiceStatus;