import LotusPetal from "./LotusPetal";

export default function NeuralLotus() {
    return (
        <svg
            className="neural-lotus"
            viewBox="-80 -80 160 160"
            width="160"
            height="160"
        >
            {Array.from({ length: 6 }).map((_, i) => (
                <LotusPetal
                    key={i}
                    rotation={i * 60}
                    distance={30}
                />
            ))}
        </svg>
    );
}