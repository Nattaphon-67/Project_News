import React, { useState } from "react";

export default function DeleteConfirmModal({
  news,
  onClose,
  onConfirm,
}) {
  const [deleting, setDeleting] = useState(false);

  if (!news) return null;

  const handleConfirm = async () => {
    try {
      setDeleting(true);
      await onConfirm(news);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box modal-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 style={{ color: "var(--danger)" }}>
            <span>⚠️</span> ยืนยันการลบข้อมูล
          </h3>
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
          <p style={{ marginBottom: "12px", color: "var(--text-main)" }}>
            คุณแน่ใจหรือไม่ว่าต้องการลบข่าวสารต่อไปนี้ออกจากระบบอย่างถาวร?
          </p>
          <div
            style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              padding: "12px 16px",
              color: "#991b1b",
              fontWeight: 600,
              fontSize: "0.95rem",
              lineHeight: 1.5,
            }}
          >
            📰 "{news.title}"
          </div>
          <p
            style={{
              marginTop: "12px",
              fontSize: "0.825rem",
              color: "var(--text-muted)",
            }}
          >
            * หากกดยกเลิก ข้อมูลจะยังคงอยู่ในระบบตามเดิม
          </p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={deleting}
          >
            ยกเลิก
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleConfirm}
            disabled={deleting}
          >
            {deleting ? "กำลังลบ..." : "ยืนยันการลบ"}
          </button>
        </div>
      </div>
    </div>
  );
}
