import React, { useState, useEffect } from "react";

const initialForm = {
  title: "",
  reporter: "",
  category: "การศึกษา",
  publishedDate: new Date().toISOString().split("T")[0],
  description: "",
  status: true,
};

export default function NewsForm({ onSubmit, editingNews, onCancel }) {
  const [formData, setFormData] = useState(initialForm);

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
  }, [editingNews]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="news-form">
      <h3>{editingNews ? "✏️ แก้ไขข่าว" : "➕ เพิ่มข่าวใหม่"}</h3>

      <div className="form-group">
        <label htmlFor="title">หัวข้อข่าว (1-150 ตัวอักษร):</label>
        <input
          type="text"
          id="title"
          name="title"
          maxLength={150}
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="reporter">ผู้รายงานข่าว (1-100 ตัวอักษร):</label>
        <input
          type="text"
          id="reporter"
          name="reporter"
          maxLength={100}
          value={formData.reporter}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">หมวดหมู่:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="การศึกษา">การศึกษา</option>
          <option value="เทคโนโลยี">เทคโนโลยี</option>
          <option value="สังคม">สังคม</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="publishedDate">วันที่เผยแพร่:</label>
        <input
          type="date"
          id="publishedDate"
          name="publishedDate"
          value={formData.publishedDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">รายละเอียดข่าว (1-2000 ตัวอักษร):</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          maxLength={2000}
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
          />
          เผยแพร่ข่าวสาร (ถ้าไม่ติ๊กจะเป็น 'ฉบับร่าง')
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingNews ? "บันทึกการแก้ไข" : "เพิ่มข่าว"}
        </button>
        {editingNews && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
}
