import "./AetherShell.css";
import ReactorStage from "../components/reactor/ReactorStage";
import AICore from "../../components/AICore";

import TopBar from "../components/topbar/TopBar";

export default function AetherShell() {
  return (
    <div className="aether-shell">

      <TopBar />
      <div className="reactor-layer">

    <ReactorStage>

        <AICore />

    </ReactorStage>

</div>

      <aside className="bottom-region" />


    </div>
  );
}