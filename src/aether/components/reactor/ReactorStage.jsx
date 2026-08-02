import "./ReactorStage.css";

export default function ReactorStage({ children }) {
    return (
        <section className="reactor-stage">

            {/* Ambient field */}
            <div className="reactor-ambient" />

            {/* Projection basin */}
            <div className="projection-basin" />

            {/* Lotus */}
            <div className="reactor-core">
                {children}
            </div>

        </section>
    );
}