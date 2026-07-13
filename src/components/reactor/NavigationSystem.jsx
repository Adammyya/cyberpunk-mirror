import NavigationArc from "./NavigationArc";

function NavigationSystem() {
  return (
    <svg
      className="hud-svg"
      viewBox="0 0 300 300"
      width="300"
      height="300"
    >
      <NavigationArc
        radius={105}
        startAngle={20}
        endAngle={70}
      />

      <NavigationArc
        radius={105}
        startAngle={110}
        endAngle={160}
      />

      <NavigationArc
        radius={105}
        startAngle={200}
        endAngle={250}
      />

      <NavigationArc
        radius={105}
        startAngle={290}
        endAngle={340}
      />
    </svg>
  );
}

export default NavigationSystem;