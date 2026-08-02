import "./TopBar.css";
import ChromeSurface from "../../materials/ChromeSurface";

export default function TopBar() {
    return (
        <div className="aether-topbar">

            <ChromeSurface className="status-capsule">

    <div className="capsule-label">
        AURA STATE
    </div>

    <div className="capsule-state">
        Understanding
    </div>

    <div className="capsule-message">
        "Connecting perception, memory and reasoning."
    </div>

</ChromeSurface>

        </div>
    );
}