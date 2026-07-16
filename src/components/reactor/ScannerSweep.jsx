function ScannerSweep({ reactorState }) {
    let animationSpeed = "12s";

switch (reactorState) {
  case "listening":
    animationSpeed = "6s";
    break;

  case "thinking":
    animationSpeed = "2.5s";
    break;

  case "speaking":
    animationSpeed = "0s";
    break;

  default:
    animationSpeed = "12s";
}
  return (
    <svg
  className="scanner-sweep"
  style={{
    animationDuration: animationSpeed,
    animationPlayState:
      reactorState === "speaking"
        ? "paused"
        : "running",
  }}
  viewBox="0 0 300 300"
>
        <defs>
            <linearGradient
    id="scannerGradient"
    x1="0%"
    y1="0%"
    x2="100%"
    y2="0%"
>

    <stop offset="0%" stopColor="transparent"/>

    <stop offset="20%" stopColor="#00E5FF" stopOpacity=".15"/>

    <stop offset="65%" stopColor="#00E5FF"/>

    <stop offset="100%" stopColor="#FFFFFF"/>

</linearGradient>
</defs>
<path
  d="
    M 150 40
    A 118 118 0 0 1 205 55
  "
  fill="none"
  stroke="url(#scannerGradient)"
  strokeWidth="4"
  strokeLinecap="round"
/>
      {/* <line
        x1="150"
        y1="150"
        x2="150"
        y2="10"
        stroke="url(#scannerGradient)"
        strokeWidth="8"
        strokeLinecap="round"
      /> */}
    </svg>
  );
}

export default ScannerSweep;