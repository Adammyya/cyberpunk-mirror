import "./AetherShell.css";

import TopBar from "../components/topbar/TopBar";

export default function AetherShell() {
  return (
    <div className="aether-shell">

      <TopBar />

      <div className="projection-layout">

    <aside className="left-region" />

    <aside className="right-region" />

</div>

<div className="reactor-layer" />

      <aside className="bottom-region" />


    </div>
  );
}