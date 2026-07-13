function GuideRing({
  radius = 118,
  stroke="rgba(168,85,247,0.45)",
  strokeWidth = 1.2,
  dashArray="2 4",
}) {
  return (
    <circle
      cx="150"
      cy="150"
      r={radius}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={dashArray}
    />
  );
}

export default GuideRing;