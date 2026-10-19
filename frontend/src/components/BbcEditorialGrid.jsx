import React from "react";
import { getNewsImage, formatTimeAgo, calculateReadingTime } from "../utils/newsHelpers";

export default function BbcEditorialGrid({
  newsList,
  loading,
  onView,
  onClearFilter,
}) {
  if (loading) {
    return (
      <div className="bbc-loading-box">
        <div className="bbc-spinner"></div>
        <p>กำลังโหลดข่าวสารล่าสุด...</p>
      </div>
    );
  }

  if (newsList.length === 0) {
    return (
      <div className="bbc-empty-box">
        <div className="bbc-empty-title">ไม่พบข่าวสารในหมวดหมู่นี้</div>
        <p>ไม่พบรายการข่าวที่ตรงกับเงื่อนไขการค้นหา</p>
        <button
          type="button"
          className="bbc-btn-outline"
          onClick={onClearFilter}
        >
          กลับสู่หน้าข่าวทั้งหมด
        </button>
      </div>
    );
  }

  // แยกข่าวสำหรับจัด Layout สไตล์ BBC (3 คอลัมน์)
  // ข่าวเด่นหลัก (Lead Story) = ข่าวแรก
  const leadStory = newsList[0];
  // ข่าวรองคอลัมน์ซ้าย (Left Secondary Stories) = ข่าวที่ 1 และ 2
  const leftStories = newsList.slice(1, 3);
  // ข่าวฟีดคอลัมน์ขวา (Right Editorial Feed) = ข่าวที่ 3 ถึง 6
  const rightStories = newsList.slice(3, 7);
  // ข่าวที่เหลือ (More Stories)
  const remainingStories = newsList.slice(7);

  return (
    <div className="bbc-portal-container">
      {/* 3-Column BBC Hero Grid */}
      <div className="bbc-grid-layout">
        {/* =========================================
            Column 1: Left Secondary Stories (2 ข่าวซ้าย)
            ========================================= */}
        <div className="bbc-col-left">
          {leftStories.map((story) => (
            <article
              key={story.id}
              className="bbc-story-card left-card"
              onClick={() => onView(story)}
            >
              <div className="bbc-img-wrapper">
                <img
                  src={getNewsImage(story)}
                  alt={story.title}
                  className="bbc-story-img"
                  loading="lazy"
                />
              </div>
              <h3 className="bbc-story-title">{story.title}</h3>
              <p className="bbc-story-snippet">
                {story.description.slice(0, 110)}...
              </p>
              <div className="bbc-story-meta">
                <span className="bbc-meta-time">
                  {formatTimeAgo(story.publishedDate)}
                </span>
                <span className="bbc-meta-dot">|</span>
                <span className="bbc-meta-cat">{story.category}</span>
              </div>
            </article>
          ))}
        </div>

        {/* =========================================
            Column 2: Center Main Lead Story (ข่าวเด่นกลาง)
            ========================================= */}
        <div className="bbc-col-center">
          {leadStory && (
            <article
              className="bbc-lead-story"
              onClick={() => onView(leadStory)}
            >
              <div className="bbc-lead-img-wrapper">
                <img
                  src={getNewsImage(leadStory)}
                  alt={leadStory.title}
                  className="bbc-lead-img"
                />
              </div>

              <div className="bbc-lead-content">
                <div className="bbc-lead-tag-row">
                  <span className="bbc-live-badge">
                    <span className="bbc-live-dot"></span> ข่าวด่วน
                  </span>
                  <span className="bbc-cat-pill">{leadStory.category}</span>
                  <span className="bbc-reading-time">
                    {calculateReadingTime(leadStory.description)}
                  </span>
                </div>

                <h2 className="bbc-lead-title">{leadStory.title}</h2>

                <p className="bbc-lead-description">
                  {leadStory.description.slice(0, 180)}...
                </p>

                <div className="bbc-lead-byline">
                  <span>
                    ผู้รายงาน: <strong>{leadStory.reporter}</strong>
                  </span>
                  <span className="bbc-meta-dot">•</span>
                  <span>{leadStory.publishedDate}</span>
                </div>
              </div>
            </article>
          )}
        </div>

        {/* =========================================
            Column 3: Right Editorial Feed (ฟีดข่าวขวาคั่นเส้น)
            ========================================= */}
        <div className="bbc-col-right">
          <div className="bbc-feed-header">
            <h4>ข่าวล่าสุด</h4>
          </div>

          <div className="bbc-feed-list">
            {rightStories.map((story) => (
              <article
                key={story.id}
                className="bbc-feed-item"
                onClick={() => onView(story)}
              >
                <h4 className="bbc-feed-title">{story.title}</h4>
                <p className="bbc-feed-snippet">
                  {story.description.slice(0, 95)}...
                </p>
                <div className="bbc-story-meta">
                  <span className="bbc-meta-time">
                    {formatTimeAgo(story.publishedDate)}
                  </span>
                  <span className="bbc-meta-dot">|</span>
                  <span className="bbc-meta-cat">{story.category}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================
          More News Section (ตารางการ์ดข่าวด้านล่าง)
          ========================================= */}
      {remainingStories.length > 0 && (
        <section className="bbc-more-section">
          <div className="bbc-section-divider-bar">
            <h3>ข่าวสารเพิ่มเติมประจำวันนี้</h3>
          </div>

          <div className="bbc-more-grid">
            {remainingStories.map((story) => (
              <article
                key={story.id}
                className="bbc-more-card"
                onClick={() => onView(story)}
              >
                <div className="bbc-more-img-wrapper">
                  <img
                    src={getNewsImage(story)}
                    alt={story.title}
                    className="bbc-more-img"
                    loading="lazy"
                  />
                  <span className="bbc-more-cat-tag">{story.category}</span>
                </div>
                <div className="bbc-more-body">
                  <h4 className="bbc-more-title">{story.title}</h4>
                  <p className="bbc-more-snippet">
                    {story.description.slice(0, 90)}...
                  </p>
                  <div className="bbc-story-meta">
                    <span className="bbc-meta-time">
                      {formatTimeAgo(story.publishedDate)}
                    </span>
                    <span className="bbc-meta-dot">•</span>
                    <span>{story.reporter}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
