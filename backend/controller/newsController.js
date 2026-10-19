const { Op } = require("sequelize");
const News = require("../model/News");

const ALLOWED_CATEGORIES = ["การศึกษา", "เทคโนโลยี", "สังคม"];

// Helper checking positive integer ID
const isPositiveInteger = (val) => {
  const num = Number(val);
  return Number.isInteger(num) && num > 0;
};

// 1. GET /api/news (อ่านรายการ ค้นหา และกรอง)
exports.getAllNews = async (req, res) => {
  try {
    const { title, search, q, category } = req.query;
    const whereCondition = {};

    // ค้นหาหัวข้อข่าวบางส่วน (Case-insensitive ด้วย Op.iLike ใน PostgreSQL)
    const searchTerm = title || search || q;
    if (searchTerm && searchTerm.trim() !== "") {
      whereCondition.title = {
        [Op.iLike]: `%${searchTerm.trim()}%`,
      };
    }

    // กรองหมวดหมู่ พร้อมตรวจสอบว่าอยู่ในหมวดหมู่ที่อนุญาตหรือไม่ (Test Case 4: ส่งหมวดหมู่ที่ไม่กำหนด ตอบ 400)
    if (category !== undefined && category.trim() !== "") {
      const trimmedCategory = category.trim();
      if (!ALLOWED_CATEGORIES.includes(trimmedCategory)) {
        return res.status(400).json({
          message: "หมวดหมู่ต้องเป็น การศึกษา, เทคโนโลยี หรือ สังคม เท่านั้น",
        });
      }
      whereCondition.category = trimmedCategory;
    }

    const newsList = await News.findAll({
      where: whereCondition,
      order: [["id", "DESC"]],
    });

    // ถ้าไม่พบข้อมูล ส่ง 200 พร้อม array ว่างตามข้อกำหนด (Test Case 10)
    return res.status(200).json(newsList);
  } catch (error) {
    console.error("Error fetching news:", error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดภายในระบบ" });
  }
};

// 2. GET /api/news/:id (อ่านรายละเอียด 1 รายการ)
exports.getNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    // ตรวจสอบว่า ID เป็นจำนวนเต็มบวกหรือไม่ (Test Case 12)
    if (!isPositiveInteger(id)) {
      return res.status(400).json({ message: "รหัสข่าวต้องเป็นจำนวนเต็มบวก" });
    }

    const newsItem = await News.findByPk(id);

    // ไม่พบข่าว ตอบ 404 (Test Case 11)
    if (!newsItem) {
      return res.status(404).json({ message: "ไม่พบข่าวที่ระบุ" });
    }

    return res.status(200).json(newsItem);
  } catch (error) {
    console.error("Error fetching news by ID:", error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดภายในระบบ" });
  }
};

// 3. POST /api/news (เพิ่มข่าวใหม่)
exports.createNews = async (req, res) => {
  try {
    const { title, reporter, category, publishedDate, description, status } = req.body;

    // ตรวจสอบข้อความว่างล้วน (Test Case 3: ส่งชื่อที่มีเฉพาะช่องว่าง ตอบ 400)
    if (
      !title ||
      typeof title !== "string" ||
      title.trim() === "" ||
      !reporter ||
      typeof reporter !== "string" ||
      reporter.trim() === "" ||
      !description ||
      typeof description !== "string" ||
      description.trim() === ""
    ) {
      return res.status(400).json({
        message: "กรุณากรอกข้อมูลให้ครบถ้วน และไม่สามารถใช้ข้อความว่างล้วนได้",
      });
    }

    // ตรวจสอบความยาว
    if (title.trim().length > 150) {
      return res.status(400).json({ message: "หัวข้อข่าวต้องมีความยาวไม่เกิน 150 ตัวอักษร" });
    }
    if (reporter.trim().length > 100) {
      return res.status(400).json({ message: "ชื่อผู้รายงานข่าวต้องมีความยาวไม่เกิน 100 ตัวอักษร" });
    }
    if (description.trim().length > 2000) {
      return res.status(400).json({ message: "รายละเอียดข่าวต้องมีความยาวไม่เกิน 2,000 ตัวอักษร" });
    }

    // ตรวจสอบหมวดหมู่ (Test Case 4)
    if (!category || !ALLOWED_CATEGORIES.includes(category)) {
      return res.status(400).json({
        message: "หมวดหมู่ต้องเป็น การศึกษา, เทคโนโลยี หรือ สังคม เท่านั้น",
      });
    }

    // ตรวจสอบวันที่
    if (!publishedDate || isNaN(Date.parse(publishedDate))) {
      return res.status(400).json({
        message: "รูปแบบวันที่ไม่ถูกต้อง กรุณาใช้วันที่รูปแบบ YYYY-MM-DD",
      });
    }

    const newNews = await News.create({
      title: title.trim(),
      reporter: reporter.trim(),
      category,
      publishedDate,
      description: description.trim(),
      status: status !== undefined ? Boolean(status) : true,
    });

    // เพิ่มสำเร็จ ตอบ 201 (Test Case 2)
    return res.status(201).json(newNews);
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      const messages = error.errors.map((err) => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    console.error("Error creating news:", error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดภายในระบบ" });
  }
};

// 4. PUT /api/news/:id (แก้ไขข่าว)
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;

    // ตรวจสอบ ID เป็นจำนวนเต็มบวก (Test Case 12)
    if (!isPositiveInteger(id)) {
      return res.status(400).json({ message: "รหัสข่าวต้องเป็นจำนวนเต็มบวก" });
    }

    const newsItem = await News.findByPk(id);

    // ถ้าไม่พบรหัส ตอบ 404 (Test Case 11)
    if (!newsItem) {
      return res.status(404).json({ message: "ไม่พบข่าวที่ระบุ" });
    }

    const { title, reporter, category, publishedDate, description, status } = req.body;

    // ตรวจสอบข้อความว่างล้วน (Test Case 3)
    if (
      !title ||
      typeof title !== "string" ||
      title.trim() === "" ||
      !reporter ||
      typeof reporter !== "string" ||
      reporter.trim() === "" ||
      !description ||
      typeof description !== "string" ||
      description.trim() === ""
    ) {
      return res.status(400).json({
        message: "กรุณากรอกข้อมูลให้ครบถ้วน และไม่สามารถใช้ข้อความว่างล้วนได้",
      });
    }

    if (title.trim().length > 150) {
      return res.status(400).json({ message: "หัวข้อข่าวต้องมีความยาวไม่เกิน 150 ตัวอักษร" });
    }
    if (reporter.trim().length > 100) {
      return res.status(400).json({ message: "ชื่อผู้รายงานข่าวต้องมีความยาวไม่เกิน 100 ตัวอักษร" });
    }
    if (description.trim().length > 2000) {
      return res.status(400).json({ message: "รายละเอียดข่าวต้องมีความยาวไม่เกิน 2,000 ตัวอักษร" });
    }

    // ตรวจสอบหมวดหมู่ (Test Case 4)
    if (!category || !ALLOWED_CATEGORIES.includes(category)) {
      return res.status(400).json({
        message: "หมวดหมู่ต้องเป็น การศึกษา, เทคโนโลยี หรือ สังคม เท่านั้น",
      });
    }

    // ตรวจสอบวันที่
    if (!publishedDate || isNaN(Date.parse(publishedDate))) {
      return res.status(400).json({
        message: "รูปแบบวันที่ไม่ถูกต้อง กรุณาใช้วันที่รูปแบบ YYYY-MM-DD",
      });
    }

    await newsItem.update({
      title: title.trim(),
      reporter: reporter.trim(),
      category,
      publishedDate,
      description: description.trim(),
      status: status !== undefined ? Boolean(status) : newsItem.status,
    });

    // แก้ไขสำเร็จ ตอบ 200 (Test Case 6)
    return res.status(200).json(newsItem);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const messages = error.errors.map((err) => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    console.error("Error updating news:", error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดภายในระบบ" });
  }
};

// 5. DELETE /api/news/:id (ลบข่าว)
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    // ตรวจสอบ ID เป็นจำนวนเต็มบวก (Test Case 12)
    if (!isPositiveInteger(id)) {
      return res.status(400).json({ message: "รหัสข่าวต้องเป็นจำนวนเต็มบวก" });
    }

    const newsItem = await News.findByPk(id);

    // ไม่พบรหัส ตอบ 404 (Test Case 11)
    if (!newsItem) {
      return res.status(404).json({ message: "ไม่พบข่าวที่ระบุ" });
    }

    await newsItem.destroy();

    // ลบสำเร็จ ตอบ 200 (Test Case 8)
    return res.status(200).json({ message: "ลบข่าวสำเร็จ", id: Number(id) });
  } catch (error) {
    console.error("Error deleting news:", error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดภายในระบบ" });
  }
};
