const { DataTypes } = require("sequelize");
// ปรับ path การดึง sequelize instance ตามที่คุณตั้งค่าใน config/database.js
const sequelize = require("../config/database");

const News = sequelize.define(
  "News",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notNull: { msg: "กรุณาระบุหัวข้อข่าว" },
        notEmpty: { msg: "หัวข้อข่าวต้องไม่เป็นค่าว่าง" },
        len: {
          args: [1, 150],
          msg: "หัวข้อข่าวต้องมีความยาวระหว่าง 1 ถึง 150 ตัวอักษร",
        },
        // ตรวจสอบว่าไม่เป็นช่องว่างล้วน (whitespace only)
        isNotBlank(value) {
          if (value && value.trim().length === 0) {
            throw new Error("หัวข้อข่าวต้องไม่เป็นช่องว่างล้วน");
          }
        },
      },
    },
    reporter: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: "กรุณาระบุชื่อผู้รายงานข่าว" },
        notEmpty: { msg: "ชื่อผู้รายงานข่าวต้องไม่เป็นค่าว่าง" },
        len: {
          args: [1, 100],
          msg: "ชื่อผู้รายงานข่าวต้องมีความยาวระหว่าง 1 ถึง 100 ตัวอักษร",
        },
        isNotBlank(value) {
          if (value && value.trim().length === 0) {
            throw new Error("ชื่อผู้รายงานข่าวต้องไม่เป็นช่องว่างล้วน");
          }
        },
      },
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: "กรุณาเลือกหมวดหมู่ข่าว" },
        isIn: {
          args: [["การศึกษา", "เทคโนโลยี", "สังคม"]],
          msg: "หมวดหมู่ต้องเป็น การศึกษา, เทคโนโลยี หรือ สังคม เท่านั้น",
        },
      },
    },
    publishedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg: "กรุณาระบุวันที่เผยแพร่" },
        isDate: { msg: "รูปแบบวันที่ไม่ถูกต้อง (YYYY-MM-DD)" },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "กรุณาระบุรายละเอียดข่าว" },
        notEmpty: { msg: "รายละเอียดข่าวต้องไม่เป็นค่าว่าง" },
        len: {
          args: [1, 2000],
          msg: "รายละเอียดข่าวต้องมีความยาวระหว่าง 1 ถึง 2000 ตัวอักษร",
        },
        isNotBlank(value) {
          if (value && value.trim().length === 0) {
            throw new Error("รายละเอียดข่าวต้องไม่เป็นช่องว่างล้วน");
          }
        },
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // true = เผยแพร่, false = ฉบับร่าง
    },
  },
  {
    tableName: "news",
    timestamps: true, // สร้าง createdAt และ updatedAt ให้อัตโนมัติ
  },
);

module.exports = News;
