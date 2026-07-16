import { useEffect, useState } from "react";

export default function useReactorState() {
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
        console.error("Error fetching reactor state:", error);
      }
    };

    fetchReactorState();

    const interval = setInterval(fetchReactorState, 300);

    return () => clearInterval(interval);
  }, []);

  return reactorState;
}