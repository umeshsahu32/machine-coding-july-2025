import React, { useState } from "react";

const GridLight = () => {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const config = [
    [1, 0, 1],
    [1, 1, 1],
    [1, 1, 1],
  ];

  const deactivateCell = () => {
    setIsDeactivating(true);
    const timer = setInterval(() => {
      setOrder((originalOrder) => {
        const newOrder = originalOrder.slice();
        newOrder.pop();
        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }

        return newOrder;
      });
    }, 300);
  };

  const activateCell = (index) => {
    const newOrder = [...order, index];
    setOrder(newOrder);

    // DEACTIVATING CELL
    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      deactivateCell();
    }
  };

  return (
    <div className="bg-violet-50 min-h-screen flex flex-col gap-5 p-10 items-center">
      <h3 className="text-4xl pb-10 font-bold text-violet-700">Grid Light</h3>
      <div
        className="grid gap-5"
        style={{ gridTemplateColumns: `repeat(${config[0].length}, 1fr)` }}
      >
        {config.flat().map((item, index) => {
          return item ? (
            <button
              onClick={() => activateCell(index)}
              className={`w-24 h-24 border rounded-lg shadow-lg transition-all duration-200 ease-in-out border-violet-600 ${
                order.includes(index) ? "bg-violet-600" : ""
              }`}
              disabled={order.includes(index) || isDeactivating}
              key={index}
            ></button>
          ) : (
            <span key={index}></span>
          );
        })}
      </div>
    </div>
  );
};

export default GridLight;
