import React from "react";

export default function Suggestions({ data, handleClick }) {
  return (
    <div className="suggestions-dropdown">
      {data.map((item, index) => (
        <div key={index} className="suggestion-item" onClick={handleClick}>
          {item}
        </div>
      ))}
    </div>
  );
}