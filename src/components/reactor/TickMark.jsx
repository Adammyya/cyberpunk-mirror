function TickMark({
  angle = 0,
  radius = 120,
  length = 12,
  stroke = "#A855F7",
  strokeWidth = 2,
  small = false,
}) {
  const tickLength = small ? length * 0.6 : length;

  const radians = ((angle - 90) * Math.PI) / 180;

  const x1 = 150 + radius * Math.cos(radians);
  const y1 = 150 + radius * Math.sin(radians);

  const x2 = 150 + (radius - tickLength) * Math.cos(radians);
  const y2 = 150 + (radius - tickLength) * Math.sin(radians);

  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  );
}

export default TickMark;