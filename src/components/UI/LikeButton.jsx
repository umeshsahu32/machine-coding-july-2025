import React, { Fragment, useState } from "react";
import { HeartIcon, SpinnerIcon } from "../../utils/icons.jsx";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const handleLikeUnlike = async () => {
    setError(null);
    setIsFetching(true);

    try {
      const response = await fetch(
        "https://www.greatfrontend.com/api/questions/like-button",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: liked ? "unlike" : "like",
          }),
        }
      );

      console.log("response", response);

      if (response.status >= 200 && response.status < 300) {
        setLiked(!liked);
      } else {
        const res = await response.json();
        setError(res.message);
        return;
      }
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Fragment>
      <button
        onClick={handleLikeUnlike}
        className={`border-2 border-[#888] flex items-center gap-2 rounded-2xl cursor-pointer font-bold h-[30px] px-2 py-2 mb-1 text-[#888] bg-white transition-colors duration-200 hover:text-red-700 hover:border-red-700 ${
          liked
            ? "bg-red-700 border-red-700 !text-white hover:bg-red-700 hover:border-red-700 hover:text-white"
            : ""
        }`}
      >
        {isFetching ? <SpinnerIcon /> : <HeartIcon />}
        {liked ? "Liked" : "Like"}
      </button>
      {error && <div className="error">{error}</div>}
    </Fragment>
  );
};

export default LikeButton;
