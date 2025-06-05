import React, { useState } from "react";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div>
      <h3 className="text-4xl text-center font-bold mb-6">Rating Star</h3>
      <div>
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => setRating(num)}
            onMouseOver={() => setHover(num)}
            onMouseLeave={() => setHover(rating)}
            className="bg-transparent border-none outline-none cursor-pointer"
          >
            <span
              className={`m-3 text-5xl ${
                num <= ((rating && hover) || hover)
                  ? "text-yellow-600"
                  : "text-[#ccc]"
              }`}
            >
              &#9733;
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StarRating;
