import React, { useEffect } from "react";

export default function ToastNotification({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === "success";

  return (
    <div className="toast-container">
      <div className={`toast ${isSuccess ? "toast-success" : "toast-error"}`}>
        <span style={{ fontSize: "1.2rem" }}>
          {isSuccess ? "✅" : "⚠️"}
        </span>
        <span>{toast.message}</span>
        <button
          type="button"
          className="toast-close"
          onClick={onClose}
          title="ปิดการแจ้งเตือน"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
