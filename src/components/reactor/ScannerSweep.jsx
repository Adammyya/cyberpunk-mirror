function ScannerSweep() {
  return ( 
    <svg
      className="scanner-sweep"
  viewBox="0 0 300 300"
  width="300"
  height="300"
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