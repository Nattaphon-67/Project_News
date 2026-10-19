const rawUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
// ตัด trailing slash ออกหากมี เพื่อป้องกัน URL ซ้ำ เช่น //api/news
const API_URL = rawUrl.replace(/\/+$/, "");

// 1. อ่านรายการข่าวทั้งหมด พร้อมค้นหาและกรอง (GET /api/news)
export const fetchNews = async (searchTitle = "", category = "") => {
  const params = new URLSearchParams();
  if (searchTitle && searchTitle.trim()) {
    params.append("title", searchTitle.trim());
  }
  if (category && category.trim()) {
    params.append("category", category.trim());
  }

  const queryStr = params.toString() ? `?${params.toString()}` : "";
  const response = await fetch(`${API_URL}/api/news${queryStr}`);
  
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "ไม่สามารถโหลดข้อมูลข่าวสารได้");
  }
  return await response.json();
};

// 2. อ่านข่าวตาม ID (GET /api/news/:id)
export const fetchNewsById = async (id) => {
  const response = await fetch(`${API_URL}/api/news/${id}`);
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "ไม่สามารถดึงข้อมูลรายละเอียดข่าวได้");
  }
  return await response.json();
};

// 3. เพิ่มข่าวใหม่ (POST /api/news)
export const createNews = async (newsData) => {
  const response = await fetch(`${API_URL}/api/news`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newsData),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "ไม่สามารถเพิ่มข่าวได้");
  }
  return data;
};

// 4. แก้ไขข่าว (PUT /api/news/:id)
export const updateNews = async (id, newsData) => {
  const response = await fetch(`${API_URL}/api/news/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newsData),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "ไม่สามารถแก้ไขข่าวได้");
  }
  return data;
};

// 5. ลบข่าว (DELETE /api/news/:id)
export const deleteNews = async (id) => {
  const response = await fetch(`${API_URL}/api/news/${id}`, {
    method: "DELETE",
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "ไม่สามารถลบข่าวได้");
  }
  return data;
};
