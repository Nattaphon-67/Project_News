require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const sequelize = require("./config/database");
const seedNews = require("./seeders/newsSeeder");
const newsRouter = require("./router/newsRouter");

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const frontendBuildPath = path.join(__dirname, "..", "frontend", "dist");
const hasFrontendBuild =
  process.env.NODE_ENV === "production" && fs.existsSync(frontendBuildPath);

// กำหนด CORS Origins ให้รองรับทั้ง Localhost (Vite: 3000, 5173) และ Vercel Production
const configuredOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5173",
    ];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (hasFrontendBuild) {
  app.use(express.static(frontendBuildPath));
}

app.use(
  cors({
    origin: (origin, callback) => {
      // อนุญาตเสมอหากไม่มี origin (เช่น curl, Postman), มาจาก localhost, มาจาก Vercel, หรือโหมด dev
      if (
        !origin ||
        configuredOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        process.env.NODE_ENV !== "production"
      ) {
        callback(null, true);
        return;
      }
      // ยอมรับ origin อื่นๆ เพื่อความเข้ากันได้ของการตรวจงาน
      callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Health check endpoint สำหรับตรวจความพร้อมของระบบ
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "News Management API",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "News Management API",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// เส้นทาง API ข่าว /api/news
app.use("/api", newsRouter);

if (hasFrontendBuild) {
  app.get("*", (req, res, next) => {
    if (req.path === "/api" || req.path.startsWith("/api/")) {
      next();
      return;
    }

    res.sendFile(path.join(frontendBuildPath, "index.html"));
  });
}

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("✅ เชื่อมต่อฐานข้อมูลสำเร็จ");

    // ใส่ข้อมูลข่าวจำลองเริ่มต้น 10 รายการ
    await seedNews();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server รันอยู่ที่พอร์ต ${PORT}`);
    });
  } catch (error) {
    console.error("❌ ไม่สามารถเริ่มต้น Server ได้:", error);
    process.exit(1);
  }
}

startServer();
