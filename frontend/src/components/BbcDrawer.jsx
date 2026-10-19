import React, { useState } from "react";

export default function BbcDrawer({
  isOpen,
  onClose,
  searchTitle,
  setSearchTitle,
  onSearch,
  categoryFilter,
  setCategoryFilter,
  setCurrentView,
}) {
  const [localSearch, setLocalSearch] = useState(searchTitle || "");

  if (!isOpen) return null;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTitle(localSearch);
    onSearch();
    onClose();
  };

  const handleSelectCategory = (cat) => {
    setCategoryFilter(cat);
    onClose();
  };

  return (
    <div className="bbc-drawer-overlay" onClick={onClose}>
      <div className="bbc-drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="bbc-drawer-header">
          <div className="bbc-logo-blocks small">
            <span className="bbc-block">N</span>
            <span className="bbc-block">P</span>
            <span className="bbc-block">R</span>
            <span className="bbc-block">U</span>
          </div>
          <button
            type="button"
            className="bbc-drawer-close"
            onClick={onClose}
            title="ปิดเมนู"
          >
            ✕
          </button>
        </div>

        {/* Search input in drawer */}
        <form onSubmit={handleSearchSubmit} className="bbc-drawer-search">
          <input
            type="text"
            placeholder="ค้นหาข่าว, หัวข้อ, คำสำคัญ..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
          <button type="submit" title="ค้นหา">
            🔍
          </button>
        </form>

        {/* Navigation Links */}
        <div className="bbc-drawer-menu">
          <div className="drawer-section-title">หมวดหมู่ข่าวหลัก</div>
          <button
            type="button"
            className={`drawer-item ${categoryFilter === "" ? "active" : ""}`}
            onClick={() => handleSelectCategory("")}
          >
            <span>📰 ข่าวสารทั้งหมด</span>
            <span className="drawer-arrow">›</span>
          </button>
          <button
            type="button"
            className={`drawer-item ${categoryFilter === "การศึกษา" ? "active" : ""}`}
            onClick={() => handleSelectCategory("การศึกษา")}
          >
            <span>🎓 การศึกษา</span>
            <span className="drawer-arrow">›</span>
          </button>
          <button
            type="button"
            className={`drawer-item ${categoryFilter === "เทคโนโลยี" ? "active" : ""}`}
            onClick={() => handleSelectCategory("เทคโนโลยี")}
          >
            <span>💻 เทคโนโลยี</span>
            <span className="drawer-arrow">›</span>
          </button>
          <button
            type="button"
            className={`drawer-item ${categoryFilter === "สังคม" ? "active" : ""}`}
            onClick={() => handleSelectCategory("สังคม")}
          >
            <span>🌿 สังคม</span>
            <span className="drawer-arrow">›</span>
          </button>

          <div className="drawer-section-title mt-4">เครื่องมือระบบ</div>
          <button
            type="button"
            className="drawer-item"
            onClick={() => {
              setCurrentView("table");
              onClose();
            }}
          >
            <span>📋 แดชบอร์ดตารางข้อมูล (CRUD)</span>
            <span className="drawer-arrow">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}
