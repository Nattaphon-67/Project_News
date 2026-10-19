import React from "react";

export default function NewsHeader({ onAddNew }) {
  return (
    <header className="main-header">
      <div className="header-title-area">
        <h1>
          <span>📰</span> ระบบบริหารจัดการข่าวสาร
        </h1>
        <div className="header-subtitle">
          <span className="badge-tag">7153403 Web Service Technology</span>
          <span>ชุดที่ 2: ระบบจัดการข้อมูลข่าว (News Service)</span>
        </div>
      </div>
      <div className="header-actions">
        <button className="btn btn-primary" onClick={onAddNew}>
          <span>➕</span> เพิ่มข่าวใหม่
        </button>
      </div>
    </header>
  );
}
