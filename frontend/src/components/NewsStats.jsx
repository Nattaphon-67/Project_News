import React from "react";

export default function NewsStats({ newsList }) {
  const total = newsList.length;
  const published = newsList.filter((n) => n.status === true).length;
  const drafts = newsList.filter((n) => n.status === false).length;

  return (
    <section className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon total">📰</div>
        <div className="stat-info">
          <h4>ข่าวทั้งหมด</h4>
          <div className="stat-number">{total}</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon published">✅</div>
        <div className="stat-info">
          <h4>เผยแพร่แล้ว</h4>
          <div className="stat-number">{published}</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon draft">📝</div>
        <div className="stat-info">
          <h4>ฉบับร่าง</h4>
          <div className="stat-number">{drafts}</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon category">🏷️</div>
        <div className="stat-info">
          <h4>หมวดหมู่</h4>
          <div className="stat-number">3 หมวด</div>
        </div>
      </div>
    </section>
  );
}
