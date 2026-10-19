const express = require("express");
const router = express.Router();
const newsController = require("../controller/newsController");

// GET /api/news - อ่านรายการ ค้นหา และกรอง
router.get("/news", newsController.getAllNews);

// GET /api/news/:id - อ่านรายละเอียด 1 รายการ
router.get("/news/:id", newsController.getNewsById);

// POST /api/news - เพิ่มรายการข่าว
router.post("/news", newsController.createNews);

// PUT /api/news/:id - แก้ไขข่าว
router.put("/news/:id", newsController.updateNews);

// DELETE /api/news/:id - ลบข่าว
router.delete("/news/:id", newsController.deleteNews);

module.exports = router;
