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
                    M 0 -52
                    C 18 -46 24 -18 0 0
                    C -24 -18 -18 -46 0 -52
                    Z
                "
                className="lotus-petal"
            />

        </g>

    );

}