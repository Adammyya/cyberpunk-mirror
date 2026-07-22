import LotusPetal from "./LotusPetal";
import "./lotus.css";

export default function NeuralLotus() {
    return (
        <svg
            className="neural-lotus"
            viewBox="-80 -80 160 160"
            width="160"
            height="160"
        >
            {Array.from({ length: 8 }).map((_, i) => (
                <LotusPetal
                    key={i}
                    rotation={i * 45}
                    distance={52 }
                />
            ))}
        </svg>
    );
}