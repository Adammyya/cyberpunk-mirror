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
            <>
  {/* Secondary Petals */}
  {Array.from({ length: 6 }).map((_, i) => (
    <LotusPetal
      key={`secondary-${i}`}
      rotation={i * 60 + 30}
      distance={44}
      scale={0.72}
    />
  ))}

  {/* Primary Petals */}
  {Array.from({ length: 6 }).map((_, i) => (
    <LotusPetal
      key={`primary-${i}`}
      rotation={i * 60}
      distance={52}
      scale={1}
    />
  ))}
</>
        </svg>
    );
}