import React, { useState, useEffect } from "react";
import { items } from "../../utils/filterProducts";

const FilterProduct = () => {
  const filters = ["Bags", "Watches", "Sports", "Sunglasses"];
  const [filteredData, setFilteredData] = useState(items);
  const [activeFilters, setActiveFilters] = useState([]);

  const handleFilterClick = (e) => {
    const category = e.target.id;
    if (activeFilters.includes(category)) {
      const filters = activeFilters.filter((el) => el !== category);
      setActiveFilters(filters);
    } else {
      setActiveFilters([...activeFilters, category]);
    }
  };

  const filterProducts = () => {
    if (activeFilters.length) {
      const tempItems = items.filter((item) =>
        activeFilters.includes(item.category)
      );
      setFilteredData(tempItems);
    } else {
      setFilteredData(items);
    }
  };

  useEffect(() => {
    filterProducts();
  }, [activeFilters]);

  return (
    <div>
      <h2 className="text-slate-700 text-center text-4xl">Filter Product</h2>
      <div className="my-10 flex flex-col justify-center items-center">
        <span className="text-xl mb-3">Categories</span>
        <div>
          {filters.map((item, idx) => (
            <button
              onClick={handleFilterClick}
              className={`rounded cursor-pointer border border-slate-600 p-2 m-3 transition-all duration-200 hover:bg-slate-700 hover:text-white ${
                activeFilters.includes(item) ? "bg-slate-700 text-white" : ""
              }`}
              key={idx}
              id={item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center flex-wrap">
        {filteredData.map((item, idx) => (
          <div
            className="flex flex-col justify-center items-center w-28 h-24 border border-slate-500 m-3 cursor-pointer"
            key={idx}
          >
            <p>{item.name}</p>
            <p className="text-lg ">{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterProduct;
