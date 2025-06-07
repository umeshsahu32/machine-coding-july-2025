import { useEffect, useState } from "react";

const paginationBtnClass =
  "w-10 h-10 flex items-center justify-center m-3 p-3 rounded-sm transition-colors duration-200 hover:bg-gray-700 hover:text-white border border-gray-800";

const ProductCard = ({ title, img }) => {
  return (
    <div className="flex flex-col justify-center items-center border bg-slate-100 rounded-md shadow-md border-gray-300 p-4 max-w-[300px] h-auto">
      <img className="w-40" src={img} alt={title} />
      <h4 className="text-lg text-center text-gray-600 capitalize font-semibold">
        {title}
      </h4>
    </div>
  );
};

const LeftRightArrows = ({ onClickFn, isLeftDisabled, icon }) => {
  return (
    <span
      onClick={onClickFn}
      className={`${paginationBtnClass} ${
        isLeftDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } text-2xl`}
    >
      {icon}
    </span>
  );
};

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const PAGE_SIZE = 12;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://dummyjson.com/products?limit=500");
      const data = await response.json();
      setProducts(data?.products || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalProducts = products.length;
  const numOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const leftArrowClickHandler = () => {
    if (currentPage > 0) {
      setCurrentPage((cp) => cp - 1);
    }
  };

  console.log(currentPage, numOfPages - 1);

  const rightArrowClickHandler = () => {
    if (currentPage < numOfPages - 1) {
      setCurrentPage((cp) => cp + 1);
    }
  };

  const isLeftDisabled = currentPage === 0;
  const isRightDisabled = currentPage === numOfPages - 1;

  if (products.length === 0) return <p>No Product Found...</p>;
  if (loading) return <p>Loading products...</p>;

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6">
        Pagination (Frontend)
      </h1>

      <div className="grid grid-cols-4 gap-4">
        {products.slice(start, end).map((item) => {
          return (
            <ProductCard
              key={item.id}
              img={item.thumbnail}
              title={item.title}
            />
          );
        })}
      </div>

      <div className="flex items-center flex-wrap">
        <LeftRightArrows
          onClickFn={leftArrowClickHandler}
          isLeftDisabled={isLeftDisabled}
          icon="&larr;"
        />
        {[...Array(numOfPages).keys()].map((num) => (
          <span
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`${paginationBtnClass} cursor-pointer ${
              currentPage === num ? "bg-gray-700 text-white" : ""
            }`}
          >
            {num + 1}
          </span>
        ))}
        <LeftRightArrows
          onClickFn={rightArrowClickHandler}
          isLeftDisabled={isRightDisabled}
          icon="&rarr;"
        />
      </div>
    </div>
  );
};

export default Pagination;
