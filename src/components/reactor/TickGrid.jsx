import TickMark from "./TickMark";
import GuideRing from "./GuideRing";

const majorAngles = [0, 90, 180, 270];

const mediumAngles = [
  30, 60,
  120, 150,
  210, 240,
  300, 330,
];

const minorAngles = [
  15, 45, 75,
  105, 135, 165,
  195, 225, 255,
  285, 315, 345,
];

function TickGrid() {
  return (
    <svg
      className="tick-grid"
      viewBox="0 0 300 300"
    >
      <GuideRing />

      {/* Calibration Crosshair */}

      <line
        x1="150"
        y1="18"
        x2="150"
        y2="34"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
      />

      <line
        x1="150"
        y1="266"
        x2="150"
        y2="282"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
      />

      <line
        x1="18"
        y1="150"
        x2="34"
        y2="150"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
      />

      <line
        x1="266"
        y1="150"
        x2="282"
        y2="150"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
      />

      {/* Major Tick Marks */}

      {majorAngles.map((angle) => (
        <TickMark
          key={`major-${angle}`}
          angle={angle}
          length={14}
          strokeWidth={2}
        />
      ))}

      {/* Medium Tick Marks */}

      {mediumAngles.map((angle) => (
        <TickMark
          key={`medium-${angle}`}
          angle={angle}
          length={10}
          strokeWidth={1.5}
          stroke="rgba(168,85,247,.6)"
        />
      ))}

      {/* Minor Tick Marks */}

      {minorAngles.map((angle) => (
        <TickMark
          key={`minor-${angle}`}
          angle={angle}
          length={6}
          strokeWidth={1}
          stroke="rgba(168,85,247,.35)"
        />
      ))}
    </svg>
  );
}

export default TickGrid;