import React from "react";

export default function NewsTable({
  newsList,
  loading,
  onView,
  onEdit,
  onDelete,
  onClearFilter,
}) {
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
    <div className="table-card">
      <div className="table-header-bar">
        <h2>📑 รายการข่าวสารทั้งหมด ({newsList.length} รายการ)</h2>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>กำลังโหลดข้อมูลข่าวสารจากฐานข้อมูล...</p>
        </div>
      ) : newsList.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📂</div>
          <h3>ไม่พบข้อมูลข่าวสาร</h3>
          <p>ไม่พบรายการข่าวที่ตรงกับเงื่อนไขการค้นหา หรือยังไม่มีข้อมูลในระบบ</p>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onClearFilter}
          >
            แสดงข่าวทั้งหมด
          </button>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th className="col-id">รหัส</th>
                <th>หัวข้อข่าว</th>
                <th>ผู้รายงาน</th>
                <th>หมวดหมู่</th>
                <th>วันที่เผยแพร่</th>
                <th>สถานะ</th>
                <th style={{ textAlign: "center" }}>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {newsList.map((item) => (
                <tr key={item.id}>
                  <td className="col-id">#{item.id}</td>
                  <td className="col-title">
                    <span
                      className="news-title-link"
                      onClick={() => onView(item)}
                      title="คลิกเพื่ออ่านรายละเอียดฉบับเต็ม"
                    >
                      {item.title}
                    </span>
                  </td>
                  <td>
                    <div className="reporter-cell">
                      <div className="reporter-avatar">
                        {item.reporter ? item.reporter.charAt(0) : "U"}
                      </div>
                      <span>{item.reporter}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${getCategoryBadgeClass(item.category)}`}>
                      {item.category}
                    </span>
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>{item.publishedDate}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status ? "badge-published" : "badge-draft"
                      }`}
                    >
                      <span className="badge-dot"></span>
                      {item.status ? "เผยแพร่" : "ฉบับร่าง"}
                    </span>
                  </td>
                  <td>
                    <div className="actions-cell" style={{ justifyContent: "center" }}>
                      <button
                        className="btn btn-sm btn-view"
                        onClick={() => onView(item)}
                        title="เปิดดูรายละเอียดครบทุกฟิลด์"
                      >
                        👁️ ดู
                      </button>
                      <button
                        className="btn btn-sm btn-edit"
                        onClick={() => onEdit(item)}
                        title="แก้ไขข้อมูลข่าว"
                      >
                        ✏️ แก้ไข
                      </button>
                      <button
                        className="btn btn-sm btn-delete"
                        onClick={() => onDelete(item)}
                        title="ลบรายการข่าว"
                      >
                        🗑️ ลบ
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
