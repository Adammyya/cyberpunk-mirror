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
    d="
        M 0 -62

        C 10 -60 18 -48 21 -32
        C 24 -14 18 6 0 24

        C -18 6 -24 -14 -21 -32
        C -18 -48 -10 -60 0 -62

        Z
    "
    className="lotus-petal"
/>

        </g>

    );

}