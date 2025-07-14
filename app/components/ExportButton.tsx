"use client";

import React from "react";

const ExportButton = () => {
  const handleExport = () => {
    const messages = localStorage.getItem("messages");
    if (messages) {
      const blob = new Blob([messages], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "messages.json";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <button className="btn" onClick={handleExport}>
      Export Messages
    </button>
  );
};

export default ExportButton;
