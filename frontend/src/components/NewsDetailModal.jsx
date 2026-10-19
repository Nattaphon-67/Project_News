import React from "react";
import { getNewsImage, calculateReadingTime } from "../utils/newsHelpers";

export default function NewsDetailModal({
  news,
  onClose,
  onEdit,
}) {
  if (!news) return null;

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case "การศึกษา":
        return "badge-edu";
      case "เทคโนโลยี":
        return "badge-tech";
      case "สังคม":
        return "badge-soc";
      default:
        return "";
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box bbc-modal-article" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="bbc-modal-header-meta">
            <span className="bbc-block mini">N</span>
            <span className="bbc-block mini">P</span>
            <span className="bbc-block mini">R</span>
            <span className="bbc-block mini">U</span>
            <span style={{ marginLeft: "8px", fontWeight: "600", fontSize: "0.85rem", color: "#666" }}>
              NPRU NEWSROOM
            </span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            title="ปิดหน้าต่าง"
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          {/* Article Full Cover Image */}
          <div className="bbc-article-hero-cover">
            <img
              src={getNewsImage(news)}
              alt={news.title}
              className="bbc-article-cover-img"
            />
          </div>

          <div className="article-header">
            <div className="article-meta-tags">
              <span className={`badge ${getCategoryBadgeClass(news.category)}`}>
                🏷️ {news.category}
              </span>
              <span
                className={`badge ${
                  news.status ? "badge-published" : "badge-draft"
                }`}
              >
                <span className="badge-dot"></span>
                {news.status ? "เผยแพร่แล้ว" : "ฉบับร่าง"}
              </span>
              <span className="badge-tag" style={{ color: "#475569" }}>
                รหัสข่าว #{news.id}
              </span>
              <span className="badge-tag" style={{ color: "#475569" }}>
                ⏱️ {calculateReadingTime(news.description)}
              </span>
            </div>

            <h2 className="article-title">{news.title}</h2>

            <div className="article-byline">
              <div className="byline-item">
                <span>✍️ ผู้รายงาน: <strong>{news.reporter}</strong></span>
              </div>
              <div className="byline-item">
                <span>📅 วันที่เผยแพร่: <strong>{news.publishedDate}</strong></span>
              </div>
            </div>
          </div>

          <div className="article-body">{news.description}</div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            ปิด
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onEdit(news);
            }}
          >
            ✏️ แก้ไขข่าวนี้
          </button>
        </div>
      </div>
    </div>
  );
}
