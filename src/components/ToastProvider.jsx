"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "rgba(7, 22, 64, 0.95)",
          color: "#e2e8f0",
          border: "1px solid rgba(232, 201, 106, 0.2)",
          borderRadius: "10px",
          backdropFilter: "blur(20px)",
          fontFamily: "var(--font-body), sans-serif",
          fontSize: "0.875rem",
        },
        success: {
          iconTheme: { primary: "#e8c96a", secondary: "#020818" },
        },
        error: {
          iconTheme: { primary: "#f87171", secondary: "#020818" },
        },
      }}
    />
  );
}
