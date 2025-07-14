"use client";

import React from "react";

const ImportButton = () => {
  const handleImport = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
    fileInput.addEventListener("change", (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const messages = JSON.parse(reader.result as string);
          localStorage.setItem("messages", JSON.stringify(messages));
          window.location.reload();
        };
        reader.readAsText(file);
      }
    });
    fileInput.click();
  };

  return (
    <button className="btn" onClick={handleImport}>
      Import Messages
    </button>
  );
};

export default ImportButton;
