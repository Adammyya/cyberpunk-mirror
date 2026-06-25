import { useEffect, useState } from "react";

function ThinkingTrace() {

    const [steps, setSteps] = useState([]);

    useEffect(() => {

        const loadThinking = () => {

            fetch("http://localhost:5000/api/thinking")
                .then(res => res.json())
                .then(data => setSteps(data));

        };

        loadThinking();

        const interval = setInterval(loadThinking, 500);

        return () => clearInterval(interval);

    }, []);

    return (

        <div className="space-y-2 text-xs">

            {steps.map((item, index) => (

                <div
                    key={index}
                    className="border-b border-purple-700 pb-2"
                >

                    <div className="text-purple-400">

                        [{item.time}]

                    </div>

                    <div className="text-cyan-300">

                        🧠 {item.step}

                    </div>

                </div>

            ))}

        </div>

    );

}

export default ThinkingTrace;