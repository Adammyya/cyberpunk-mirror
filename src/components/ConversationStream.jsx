import { useEffect, useState } from "react";

function ConversationStream() {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/conversation"
      );

      const data = await response.json();

      setHistory(data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHistory();

    const interval =
      setInterval(fetchHistory, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full overflow-y-auto text-sm pr-2">
      <h2 className="panel-title">
        CONVERSATION STREAM
      </h2>

      <div className="space-y-5">
        {history.length === 0 ? (
          <p className="text-cyan-400">
            Awaiting interaction...
          </p>
        ) : (
          history.map((item, index) => (
            <div
              key={index}
              className="border-b border-cyan-900 pb-3"
            >
              <p className="text-violet-400">
                YOU
              </p>

              <p className="mb-2">
                {item.user}
              </p>

              <p className="text-cyan-400">
                AURA
              </p>

              <p>
                {item.ai}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ConversationStream;