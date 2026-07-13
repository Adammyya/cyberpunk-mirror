import React from "react";

/**
 * Convert polar coordinates to SVG coordinates
 */
function polarToCartesian(cx, cy, radius, angle) {
  const radians = ((angle - 90) * Math.PI) / 180;

  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
}

/**
 * Create an SVG arc path
 */
function describeArc(cx, cy, radius, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);

  const largeArcFlag =
    endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
}

function NavigationArc({
    cx = 150,
    cy = 150,
    radius = 95,
    startAngle = 0,
    endAngle = 60,
    stroke = "#00E5FF",
    strokeWidth = 3,
}) {
  return (
    <path
      d={describeArc(
        cx,
        cy,
        radius,
        startAngle,
        endAngle
      )}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  );
}

export default NavigationArc;