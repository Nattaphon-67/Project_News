# รายงานโครงงานสอบปฏิบัติปลายภาค (Final Examination)
## รายวิชา 7153403 เทคโนโลยีการบริการเว็บ (Web Service Technology)
### ภาคเรียนที่ 1 ปีการศึกษา 2569

---

## 📌 1. ข้อมูลโครงงาน
- **รหัสนักศึกษา:** 674259006
- **ชื่อ Github Repository:** `674259006_7153403_Final_B`
- **ชุดโจทย์ที่ได้รับ:** ชุดที่ 2 **ข่าว (News - ชุด B)**
- **ตารางฐานข้อมูล:** `news`
- **เส้นทาง API หลัก:** `/api/news`
- **ผู้รับผิดชอบตามชุด:** `reporter` (ผู้รายงานข่าว)
- **วันที่ตามชุด:** `publishedDate` (วันที่เผยแพร่)
- **หมวดหมู่ที่อนุญาต:** `การศึกษา`, `เทคโนโลยี`, `สังคม`

---

## 🛠️ 2. เครื่องมือและเทคโนโลยีที่ใช้ (Tech Stack)
### **Frontend:**
- **React 18** + **Vite** (Single Page Application)
- **Modern Responsive CSS** ออกแบบสไตล์ Modern SaaS Editorial Dashboard
- **Fetch API** สำหรับเชื่อมต่อ RESTful API

### **Backend:**
- **Node.js** + **Express.js** (RESTful API Server)
- **Sequelize ORM** สำหรับจัดการฐานข้อมูลเชิงสัมพันธ์
- **PostgreSQL** (Database)
- **CORS** & **Dotenv** สำหรับจัดการความปลอดภัยและ Environment Variables

### **DevOps & Deployment:**
- **Docker & Docker Compose** สำหรับจำลองสภาพแวดล้อมการทำงานในเครื่อง
- **Vercel** สำหรับโฮสต์ Frontend (Production)
- **Render** สำหรับโฮสต์ Backend Express API (Production)

---

## 🗄️ 3. โครงสร้างฐานข้อมูล (Database Schema)

ตาราง: `news`

| ชื่อฟิลด์ | ชนิดข้อมูล Sequelize | เงื่อนไข / ข้อจำกัด | คำอธิบาย |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | Primary Key, Auto Increment | รหัสข่าวสาร |
| `title` | `STRING(150)` | ไม่เป็นค่าว่าง (1-150 ตัวอักษร, ห้ามช่องว่างล้วน) | หัวข้อข่าว |
| `reporter` | `STRING(100)` | ไม่เป็นค่าว่าง (1-100 ตัวอักษร, ห้ามช่องว่างล้วน) | ชื่อผู้รายงานข่าว |
| `category` | `STRING(50)` | เฉพาะ `['การศึกษา', 'เทคโนโลยี', 'สังคม']` | หมวดหมู่ข่าว |
| `publishedDate` | `DATEONLY` | รูปแบบ `YYYY-MM-DD` | วันที่เผยแพร่ข่าว |
| `description` | `TEXT` | ไม่เป็นค่าว่าง (1-2,000 ตัวอักษร, ห้ามช่องว่างล้วน) | รายละเอียดเนื้อหาข่าว |
| `status` | `BOOLEAN` | ค่าเริ่มต้น `true` (`true` = เผยแพร่, `false` = ฉบับร่าง) | สถานะข่าว |
| `createdAt` | `DATE` | Sequelize Timestamps อัตโนมัติ | วันที่สร้างข้อมูล |
| `updatedAt` | `DATE` | Sequelize Timestamps อัตโนมัติ | วันที่แก้ไขข้อมูลล่าสุด |

---

## 🌐 4. ข้อกำหนด RESTful API

| Method | Endpoint | หน้าที่การทำงาน | สำเร็จ (HTTP Code) | ผิดพลาด (HTTP Code) |
| :---: | :--- | :--- | :---: | :---: |
| `GET` | `/api/news` | ดึงรายการข่าวทั้งหมด, ค้นหาตามหัวข้อ (`?title=...` หรือ `?search=...`) และกรองหมวดหมู่ (`?category=...`) | `200 OK` (พบข้อมูล หรือ array ว่าง `[]`) | `400 Bad Request` (หมวดหมู่ไม่ถูกต้อง) |
| `GET` | `/api/news/:id` | ดึงข้อมูลข่าวตามรหัส (1 รายการ) | `200 OK` | `400 Bad Request` (id ไม่ใช่จำนวนเต็มบวก)<br>`404 Not Found` (ไม่พบรหัส) |
| `POST` | `/api/news` | เพิ่มรายการข่าวใหม่ | `201 Created` | `400 Bad Request` (ข้อมูลไม่ครบ / ค่าว่างล้วน / หมวดหมู่ผิด) |
| `PUT` | `/api/news/:id` | แก้ไขข้อมูลข่าวตามรหัส | `200 OK` | `400 Bad Request` (id ไม่ถูกต้อง / ข้อมูลไม่ผ่านเกณฑ์)<br>`404 Not Found` (ไม่พบรหัส) |
| `DELETE`| `/api/news/:id` | ลบรายการข่าวตามรหัส | `200 OK` | `400 Bad Request` (id ไม่ถูกต้อง)<br>`404 Not Found` (ไม่พบรหัส) |

---

## ⚙️ 5. วิธีการติดตั้งและเริ่มระบบ (Installation & Getting Started)

### **วิธีที่ 1: รันผ่าน Docker Compose (แนะนำ สะดวกที่สุด)**
1. ตรวจสอบว่าเปิด Docker Desktop เรียบร้อยแล้ว
2. รันคำสั่งเริ่มระบบทุกบริการ (Database, Backend, Frontend):
   ```bash
   docker compose up -d --build
   ```
3. เข้าใช้งานระบบ:
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:5000/api/news
   - **API Health Check:** http://localhost:5000/health

---

### **วิธีที่ 2: รันแยกทีละส่วน (Manual Setup)**

#### 1. เตรียมฐานข้อมูล (PostgreSQL)
สร้างฐานข้อมูลชื่อ `product_db` บน PostgreSQL ของท่าน (พอร์ต 5432)

#### 2. เริ่มต้น Backend:
```bash
cd backend
npm install
# คัดลอกและตั้งค่า .env
cp .env.example .env
# เริ่มต้นเซิร์ฟเวอร์ (ระบบจะ Sync ตารางและใส่ Seed Data 10 รายการให้อัตโนมัติ)
npm start
```

#### 3. เริ่มต้น Frontend:
```bash
cd frontend
npm install
# คัดลอกและตั้งค่า .env
cp .env.example .env
# เริ่มต้นเซิร์ฟเวอร์เพื่อพัฒนา
npm run dev
```

---

## 🚀 6. การนำขึ้นใช้งานจริง (Deployment Guide)

### **Backend บน Render:**
1. สร้าง **Web Service** บน Render ชี้มาที่โฟลเดอร์ `backend`
2. ตั้งค่าการ Build & Start:
   - **Root Directory:** `backend`
   - **Build Command:** `npm ci`
   - **Start Command:** `npm start`
3. ตั้งค่า Environment Variables บน Render:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: `postgres://... (URL ของ PostgreSQL บน Cloud)`
   - `ALLOWED_ORIGINS`: `https://your-frontend.vercel.app`

### **Frontend บน Vercel:**
1. เชื่อมต่อ Git Repository บน Vercel
2. ตั้งค่า Framework: **Vite**
3. ตั้งค่า Root Directory: `frontend`
4. ตั้งค่า Environment Variable:
   - `VITE_API_URL`: `https://your-backend-api.onrender.com`
5. กด Deploy

---

## 📸 7. ภาพหน้าจอการทำงาน (Screenshots Placeholder)
- ภาพที่ 1: หน้ารายการข่าวสารทั้งหมด (พร้อมสถิติ และแท็บกรองหมวดหมู่)
- ภาพที่ 2: หน้าต่าง Modal อ่านข่าวฉบับเต็ม
- ภาพที่ 3: แบบฟอร์มเพิ่มข่าวสารใหม่ และแก้ไขข่าวสาร
- ภาพที่ 4: หน้าต่างยืนยันการลบข่าวสาร
