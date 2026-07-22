export default function LotusPetal({
  rotation = 0,
  distance = 0,
  scale = 1,
}) {
  return (
    <g
      transform={`
        rotate(${rotation})
        translate(0 ${-distance})
        scale(${scale})
      `}
    >
      <path
        className="lotus-petal"
        d="
          M 0 -82

          C 8 -80 16 -64 18 -42
          C 20 -20 15 8 0 42

          C -15 8 -20 -20 -18 -42
          C -16 -64 -8 -80 0 -82

          Z
        "
      />
    </g>
  );
}