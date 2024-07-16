import React from "react";

const Display = ({ gameOver, text }) => {
  const displayClass = gameOver ? "game-over" : "";

  return (
    <div
      className={`min-h-5 border border-solid border-[#777] bg-black ${displayClass}`}
    >
      {text}
    </div>
  );
};

export default Display;
