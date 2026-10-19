import React from "react";

const CATEGORIES = [
  { id: "", label: "ทั้งหมด" },
  { id: "การศึกษา", label: "การศึกษา" },
  { id: "เทคโนโลยี", label: "เทคโนโลยี" },
  { id: "สังคม", label: "สังคม" },
];

export default function NewsFilterBar({
  searchTitle,
  setSearchTitle,
  categoryFilter,
  setCategoryFilter,
  onSearch,
  onClear,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <section className="filter-card">
      {/* Category Pills */}
      <div className="category-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id || "all"}
            type="button"
            className={`cat-tab ${categoryFilter === cat.id ? "active" : ""}`}
            onClick={() => {
              setCategoryFilter(cat.id);
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search Input and Buttons */}
      <form onSubmit={handleSubmit} className="search-row">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="ค้นหาตามหัวข้อข่าว (บางส่วน)..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          {searchTitle && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => {
                setSearchTitle("");
              }}
              title="ล้างข้อความค้นหา"
            >
              ✕
            </button>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          <span>🔎</span> ค้นหา
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClear}
        >
          <span>🔄</span> ล้างเงื่อนไข
        </button>
      </form>
    </section>
  );
}
