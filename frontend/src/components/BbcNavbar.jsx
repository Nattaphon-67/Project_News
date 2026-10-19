import React from "react";

const CATEGORIES = [
  { id: "", label: "หน้าแรก" },
  { id: "การศึกษา", label: "การศึกษา" },
  { id: "เทคโนโลยี", label: "เทคโนโลยี" },
  { id: "สังคม", label: "สังคม" },
];

export default function BbcNavbar({
  currentView,
  setCurrentView,
  categoryFilter,
  setCategoryFilter,
  onOpenDrawer,
  onAddNew,
}) {
  return (
    <header className="bbc-header-wrapper">
      {/* Top Black / Deep Slate Bar */}
      <div className="bbc-topbar">
        <div className="bbc-topbar-left">
          <button
            type="button"
            className="bbc-hamburger-btn"
            onClick={onOpenDrawer}
            title="เปิดเมนูนำทาง"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          {/* NPRU NEWS Square Logo Blocks */}
          <div className="bbc-logo-blocks" onClick={() => setCategoryFilter("")}>
            <span className="bbc-block">N</span>
            <span className="bbc-block">P</span>
            <span className="bbc-block">R</span>
            <span className="bbc-block">U</span>
            <span className="bbc-logo-text">NEWS</span>
          </div>
        </div>

        <div className="bbc-topbar-right">
          {/* View Switcher: Editorial Portal vs Table */}
          <div className="bbc-view-switcher">
            <button
              type="button"
              className={`switcher-tab ${currentView === "editorial" ? "active" : ""}`}
              onClick={() => setCurrentView("editorial")}
            >
              📰 มุมมองสำนักข่าว
            </button>
            <button
              type="button"
              className={`switcher-tab ${currentView === "table" ? "active" : ""}`}
              onClick={() => setCurrentView("table")}
            >
              📋 ตารางจัดการ (CRUD)
            </button>
          </div>

          <button type="button" className="bbc-btn-add" onClick={onAddNew}>
            ➕ เพิ่มข่าวใหม่
          </button>
        </div>
      </div>

      {/* Category Navigation Bar (with Red Indicator) */}
      <nav className="bbc-category-nav">
        <ul className="bbc-nav-list">
          {CATEGORIES.map((cat) => (
            <li key={cat.id || "all"}>
              <button
                type="button"
                className={`bbc-nav-item ${categoryFilter === cat.id ? "active" : ""}`}
                onClick={() => setCategoryFilter(cat.id)}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="bbc-nav-meta">
          <span className="live-indicator">
            <span className="live-dot"></span> LIVE UPDATES
          </span>
        </div>
      </nav>
    </header>
  );
}
