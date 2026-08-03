import "./AetherShell.css";

import TopBar from "../components/topbar/TopBar";

export default function AetherShell() {
  return (
    <div className="aether-shell">
      <TopBar />

      <div className="projection-layout">
        <aside className="left-projection" />

        <main className="reactor-region" />

        <aside className="right-projection" />
      </div>

      <footer className="bottom-dock-region" />
    </div>
  );
}