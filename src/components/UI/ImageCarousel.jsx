import { Fragment, useEffect, useState } from "react";

const ImageCarousel = () => {
  const [imageList, setImageList] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // @ IMAGE FETCH API CALL
  const fetchImages = async () => {
    setLoading(true);

    try {
      const url = "https://dummyjson.com/products";
      const response = await fetch(url);
      const result = await response.json();

      const productImageList = result?.products?.map((item) => {
        return item.images[0];
      });
      setImageList(productImageList);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // @ HANDLE CLICK HANDLER
  const handleClick = (direction) => {
    const currentIndex = imageIndex;
    const lastIndex = imageList.length - 1;

    if (direction === "left") {
      if (currentIndex === 0) {
        setImageIndex(lastIndex);
      } else {
        setImageIndex(currentIndex - 1);
      }
    }

    if (direction === "right") {
      if (currentIndex === lastIndex) {
        setImageIndex(0);
      } else {
        setImageIndex(currentIndex + 1);
      }
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const autoLoop = setInterval(() => {
      handleClick("right");
    }, 3000);

    return () => {
      clearInterval(autoLoop);
    };
  }, [imageIndex]);

  // @ JSX START
  return (
    <Fragment>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Fragment>
          <div className="flex flex-col bg-cyan-700">
            <div className="flex justify-center items-center bg-cyan-700">
              <button
                className="w-12 h-12 text-4xl m-4 border bg-white transition-all duration-200 hover:bg-cyan-800 hover:text-white  border-white flex justify-center items-center rounded-full p-8"
                onClick={() => handleClick("left")}
              >
                {"←"}
              </button>
              <img
                className="w-full h-[60vh] object-contain"
                src={imageList[imageIndex]}
                alt=""
              />
              <button
                className="w-12 h-12 text-4xl m-4 border bg-white transition-all duration-200 hover:bg-cyan-800 hover:text-white  border-white flex justify-center items-center rounded-full p-8"
                onClick={() => handleClick("right")}
              >
                {"→"}
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ImageCarousel;
