// Image mappings and editorial helpers for BBC-style layout

const CATEGORY_IMAGES = {
  "เทคโนโลยี": [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&auto=format&fit=crop&q=80",
  ],
  "การศึกษา": [
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=900&auto=format&fit=crop&q=80",
  ],
  "สังคม": [
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=900&auto=format&fit=crop&q=80",
  ],
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=900&auto=format&fit=crop&q=80";

// ดึงภาพประกอบคุณภาพสูงที่เหมาะสมกับข่าว
export const getNewsImage = (news) => {
  if (!news) return DEFAULT_IMAGE;
  const list = CATEGORY_IMAGES[news.category];
  if (!list || list.length === 0) return DEFAULT_IMAGE;
  const index = Math.abs((Number(news.id) || 1) % list.length);
  return list[index];
};

// คำนวณเวลาในการอ่านโดยประมาณ
export const calculateReadingTime = (text) => {
  if (!text) return "อ่าน 1 นาที";
  const minutes = Math.max(1, Math.ceil(text.length / 350));
  return `อ่าน ${minutes} นาที`;
};

// แปลงวันที่หรือสร้างข้อความเวลาสัมพัทธ์แบบสำนักข่าว (เช่น "3 ชั่วโมงที่แล้ว")
export const formatTimeAgo = (dateStr) => {
  if (!dateStr) return "ไม่ระบุเวลา";
  try {
    const pub = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - pub) / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return "วันนี้";
    if (diffDays === 1) return "1 วันที่แล้ว";
    if (diffDays < 7) return `${diffDays} วันที่แล้ว`;
    return dateStr;
  } catch {
    return dateStr;
  }
};
