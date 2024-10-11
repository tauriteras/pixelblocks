import React from "react";

import "../../CSS/Desktop/Buttons.css";

function Button({ text, type, color, onClick, scale, textWeight }) {
  return (
    <div
      className="button-hitbox"
      onClick={onClick}
      style={{ transform: `scale(${scale || 1})` }}
    >
      <span className={`${type || "default"}-button`}>
        <div
          className={`${type || "default"}-button-background`}
          style={{ backgroundColor: color || "gray" }}
        >
          <p
            className={`${type || "default"}-button-text`}
            style={{ fontWeight: textWeight || "normal" }}
          >
            {text || "button"}
          </p>
        </div>
      </span>
    </div>
  );
}

export default Button;
