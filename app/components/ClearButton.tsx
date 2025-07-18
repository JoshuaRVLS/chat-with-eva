import React from "react";

const ClearButton = () => {
  return (
    <div
      className="btn"
      onClick={() => {
        localStorage.clear();
        window.location.reload();
      }}
    >
      Clear Chat
    </div>
  );
};

export default ClearButton;
