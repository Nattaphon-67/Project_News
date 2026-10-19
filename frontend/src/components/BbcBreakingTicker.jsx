import React, { useState, useEffect } from "react";

export default function BbcBreakingTicker({ newsList, onSelectNews }) {
  const publishedNews = newsList.filter((n) => n.status === true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (publishedNews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % publishedNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [publishedNews.length]);

  if (publishedNews.length === 0) return null;

  const currentItem = publishedNews[currentIndex] || publishedNews[0];

  return (
    <div className="bbc-ticker-container">
      <div className="bbc-ticker-badge">
        <span className="ticker-pulse-dot"></span> ข่าวด่วน
      </div>
      <div
        className="bbc-ticker-content"
        onClick={() => onSelectNews(currentItem)}
      >
        <span className="ticker-cat">[{currentItem.category}]</span>
        <span className="ticker-title">{currentItem.title}</span>
        <span className="ticker-read-btn">อ่านต่อ ➔</span>
      </div>
    </div>
  );
}
