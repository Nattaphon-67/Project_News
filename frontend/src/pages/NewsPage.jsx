import React, { useState, useEffect } from "react";
import {
  fetchNews,
  createNews,
  updateNews,
  deleteNews,
} from "../services/newsApi";

import BbcNavbar from "../components/BbcNavbar";
import BbcDrawer from "../components/BbcDrawer";
import BbcBreakingTicker from "../components/BbcBreakingTicker";
import BbcEditorialGrid from "../components/BbcEditorialGrid";

import NewsStats from "../components/NewsStats";
import NewsFilterBar from "../components/NewsFilterBar";
import NewsTable from "../components/NewsTable";
import NewsFormModal from "../components/NewsFormModal";
import NewsDetailModal from "../components/NewsDetailModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import ToastNotification from "../components/ToastNotification";

export default function NewsPage() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // มุมมองปัจจุบัน: 'editorial' (หน้าข่าว BBC) หรือ 'table' (ตาราง CRUD จัดการข้อมูล)
  const [currentView, setCurrentView] = useState("editorial");

  // ค้นหาและกรอง
  const [searchTitle, setSearchTitle] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // สถานะ Drawer และ Modals
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [viewingNews, setViewingNews] = useState(null);
  const [deletingNews, setDeletingNews] = useState(null);

  // โหลดข้อมูลจาก Backend API
  const loadData = async (title = searchTitle, category = categoryFilter) => {
    setLoading(true);
    try {
      const data = await fetchNews(title, category);
      setNewsList(data);
    } catch (err) {
      setToast({
        type: "error",
        message: err.message || "เกิดข้อผิดพลาดในการโหลดข้อมูลข่าว",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData("", "");
  }, []);

  const handleCategoryChange = (cat) => {
    setCategoryFilter(cat);
    loadData(searchTitle, cat);
  };

  const handleSearch = () => {
    loadData(searchTitle, categoryFilter);
  };

  const handleClearFilters = () => {
    setSearchTitle("");
    setCategoryFilter("");
    loadData("", "");
  };

  const handleSaveNews = async (formData) => {
    if (editingNews) {
      await updateNews(editingNews.id, formData);
      setToast({
        type: "success",
        message: `แก้ไขข่าว "${formData.title}" เรียบร้อยแล้ว`,
      });
    } else {
      await createNews(formData);
      setToast({
        type: "success",
        message: `เพิ่มข่าว "${formData.title}" สำเร็จแล้ว`,
      });
    }
    loadData(searchTitle, categoryFilter);
  };

  const handleConfirmDelete = async (newsItem) => {
    await deleteNews(newsItem.id);
    setToast({
      type: "success",
      message: `ลบข่าว "${newsItem.title}" ออกจากระบบแล้ว`,
    });
    loadData(searchTitle, categoryFilter);
  };

  return (
    <div className="bbc-app-root">
      {/* Toast Alert */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      {/* BBC Navigation Drawer (สไลด์จากด้านซ้าย) */}
      <BbcDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
        onSearch={handleSearch}
        categoryFilter={categoryFilter}
        setCategoryFilter={handleCategoryChange}
        setCurrentView={setCurrentView}
      />

      {/* BBC Navbar with Category Tabs & Mode Switcher */}
      <BbcNavbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        categoryFilter={categoryFilter}
        setCategoryFilter={handleCategoryChange}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onAddNew={() => {
          setEditingNews(null);
          setIsFormOpen(true);
        }}
      />

      {/* Breaking News Ticker (แถบข่าวด่วน) */}
      <BbcBreakingTicker
        newsList={newsList}
        onSelectNews={(item) => setViewingNews(item)}
      />

      {/* Main Container */}
      <main className="bbc-main-content">
        {currentView === "editorial" ? (
          /* ====================================================
             1. มุมมองหน้าข่าว BBC (Editorial Grid)
             ==================================================== */
          <BbcEditorialGrid
            newsList={newsList}
            loading={loading}
            onView={(item) => setViewingNews(item)}
            onClearFilter={handleClearFilters}
          />
        ) : (
          /* ====================================================
             2. มุมมองตารางจัดการข้อมูล (CRUD Table View สำหรับตรวจงาน)
             ==================================================== */
          <div className="app-container" style={{ padding: "0" }}>
            <NewsStats newsList={newsList} />

            <NewsFilterBar
              searchTitle={searchTitle}
              setSearchTitle={setSearchTitle}
              categoryFilter={categoryFilter}
              setCategoryFilter={handleCategoryChange}
              onSearch={handleSearch}
              onClear={handleClearFilters}
            />

            <NewsTable
              newsList={newsList}
              loading={loading}
              onView={(item) => setViewingNews(item)}
              onEdit={(item) => {
                setEditingNews(item);
                setIsFormOpen(true);
              }}
              onDelete={(item) => setDeletingNews(item)}
              onClearFilter={handleClearFilters}
            />
          </div>
        )}
      </main>

      {/* BBC Footer */}
      <footer className="bbc-footer">
        <div className="bbc-footer-inner">
          <div className="bbc-logo-blocks small">
            <span className="bbc-block">N</span>
            <span className="bbc-block">P</span>
            <span className="bbc-block">R</span>
            <span className="bbc-block">U</span>
          </div>
          <p>
            © 2026 สำนักข่าว NPRU NEWS (7153403 เทคโนโลยีการบริการเว็บ) | มหาวิทยาลัยราชภัฏนครปฐม
          </p>
        </div>
      </footer>

      {/* Modal เพิ่ม / แก้ไขข่าว */}
      <NewsFormModal
        isOpen={isFormOpen}
        editingNews={editingNews}
        onClose={() => {
          setIsFormOpen(false);
          setEditingNews(null);
        }}
        onSubmit={handleSaveNews}
      />

      {/* Modal ดูรายละเอียดข่าวฉบับเต็ม */}
      <NewsDetailModal
        news={viewingNews}
        onClose={() => setViewingNews(null)}
        onEdit={(item) => {
          setEditingNews(item);
          setIsFormOpen(true);
        }}
      />

      {/* Modal ยืนยันการลบ */}
      <DeleteConfirmModal
        news={deletingNews}
        onClose={() => setDeletingNews(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
