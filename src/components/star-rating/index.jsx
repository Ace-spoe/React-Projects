import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./star.css";

const StarRating = () => {
  const totalStars = 10;
  const [rating, setRating] = useState(0);      
  const [hover, setHover] = useState(0);      
  const handleClick = (starValue) => {

    if (starValue === rating) {
      setRating(0);
    } else {
      setRating(starValue);
    }
  };

  return (
    <div className="star-container">
        <div className="star-rating">
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className="star"
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            <FaStar
              color={starValue <= (hover || rating) ? "gold" : "gray"}
            />
          </span>
        );
      })}
    </div>
    </div>
  );
};

export default StarRating;