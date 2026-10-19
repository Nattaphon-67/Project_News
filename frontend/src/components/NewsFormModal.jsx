import React, { useState, useEffect } from "react";

const initialForm = {
  title: "",
  reporter: "",
  category: "การศึกษา",
  publishedDate: new Date().toISOString().split("T")[0],
  description: "",
  status: true,
};

export default function NewsFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingNews,
}) {
  const [formData, setFormData] = useState(initialForm);
  const [validationError, setValidationError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingNews) {
      setFormData({
        title: editingNews.title || "",
        reporter: editingNews.reporter || "",
        category: editingNews.category || "การศึกษา",
        publishedDate: editingNews.publishedDate || "",
        description: editingNews.description || "",
        status: editingNews.status ?? true,
      });
    } else {
      setFormData(initialForm);
    }
    setValidationError("");
  }, [editingNews, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");

    // Frontend Validation
    if (!formData.title || formData.title.trim() === "") {
      setValidationError("กรุณาระบุหัวข้อข่าว และห้ามเป็นช่องว่างล้วน");
      return;
    }
    if (formData.title.trim().length > 150) {
      setValidationError("หัวข้อข่าวต้องมีความยาวไม่เกิน 150 ตัวอักษร");
      return;
    }
    if (!formData.reporter || formData.reporter.trim() === "") {
      setValidationError("กรุณาระบุชื่อผู้รายงานข่าว และห้ามเป็นช่องว่างล้วน");
      return;
    }
    if (formData.reporter.trim().length > 100) {
      setValidationError("ชื่อผู้รายงานข่าวต้องมีความยาวไม่เกิน 100 ตัวอักษร");
      return;
    }
    if (!formData.publishedDate) {
      setValidationError("กรุณาระบุวันที่เผยแพร่");
      return;
    }
    if (!formData.description || formData.description.trim() === "") {
      setValidationError("กรุณาระบุรายละเอียดข่าว และห้ามเป็นช่องว่างล้วน");
      return;
    }
    if (formData.description.trim().length > 2000) {
      setValidationError("รายละเอียดข่าวต้องมีความยาวไม่เกิน 2,000 ตัวอักษร");
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit({
        ...formData,
        title: formData.title.trim(),
        reporter: formData.reporter.trim(),
        description: formData.description.trim(),
      });
      onClose();
    } catch (err) {
      setValidationError(err.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <span>{editingNews ? "✏️" : "➕"}</span>
            {editingNews ? "แก้ไขข้อมูลข่าวสาร" : "เพิ่มข่าวสารใหม่"}
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

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {validationError && (
              <div
                style={{
                  background: "#fef2f2",
                  color: "#991b1b",
                  border: "1px solid #fecaca",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  marginBottom: "16px",
                }}
              >
                ⚠️ {validationError}
              </div>
            )}

            <div className="form-grid">
              {/* Title */}
              <div className="form-group form-group-full">
                <label className="form-label" htmlFor="title">
                  <span>หัวข้อข่าว (Title) *</span>
                  <span
                    className={`char-counter ${
                      formData.title.length > 140 ? "warning" : ""
                    }`}
                  >
                    {formData.title.length} / 150
                  </span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="form-control"
                  placeholder="ระบุหัวข้อข่าว (1-150 ตัวอักษร)..."
                  maxLength={150}
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Reporter */}
              <div className="form-group">
                <label className="form-label" htmlFor="reporter">
                  <span>ผู้รายงานข่าว (Reporter) *</span>
                  <span className="char-counter">
                    {formData.reporter.length} / 100
                  </span>
                </label>
                <input
                  id="reporter"
                  name="reporter"
                  type="text"
                  className="form-control"
                  placeholder="เช่น สมชาย ใจดี"
                  maxLength={100}
                  value={formData.reporter}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Category */}
              <div className="form-group">
                <label className="form-label" htmlFor="category">
                  หมวดหมู่ข่าว (Category) *
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="การศึกษา">การศึกษา</option>
                  <option value="เทคโนโลยี">เทคโนโลยี</option>
                  <option value="สังคม">สังคม</option>
                </select>
              </div>

              {/* Published Date */}
              <div className="form-group">
                <label className="form-label" htmlFor="publishedDate">
                  วันที่เผยแพร่ (Published Date) *
                </label>
                <input
                  id="publishedDate"
                  name="publishedDate"
                  type="date"
                  className="form-control"
                  value={formData.publishedDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Status Toggle Switch */}
              <div className="form-group">
                <label className="form-label">สถานะการเผยแพร่ (Status)</label>
                <label className="toggle-wrapper">
                  <div className="switch">
                    <input
                      type="checkbox"
                      name="status"
                      checked={formData.status}
                      onChange={handleChange}
                    />
                    <span className="slider"></span>
                  </div>
                  <span className="toggle-label">
                    {formData.status ? "🟢 เผยแพร่ (Published)" : "🟠 ฉบับร่าง (Draft)"}
                  </span>
                </label>
              </div>

              {/* Description */}
              <div className="form-group form-group-full">
                <label className="form-label" htmlFor="description">
                  <span>รายละเอียดข่าว (Description) *</span>
                  <span
                    className={`char-counter ${
                      formData.description.length > 1900 ? "warning" : ""
                    }`}
                  >
                    {formData.description.length} / 2,000
                  </span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  rows={5}
                  placeholder="ระบุเนื้อหาและรายละเอียดของข่าว (1-2,000 ตัวอักษร)..."
                  maxLength={2000}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={submitting}
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting
                ? "กำลังบันทึก..."
                : editingNews
                ? "บันทึกการแก้ไข"
                : "เพิ่มข่าวสาร"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
