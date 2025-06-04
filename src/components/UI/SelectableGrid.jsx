import React, { useCallback, useState } from "react";

const SelectableGrid = () => {
  const [selectedBox, setSelectedBox] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const COLUMNS = 10;
  const ROWS = 10;

  const mouseDownHandler = (boxNumber) => {
    setSelectedBox([boxNumber]);
    setIsMouseDown(true);
  };

  const mouseUpHandler = () => {
    setIsMouseDown(false);
  };

  const mouseEnterHandler = useCallback(
    (boxNumber) => {
      if (isMouseDown) {
        const startBox = selectedBox[0];
        const endBox = boxNumber;

        const startRow = Math.floor((startBox - 1) / COLUMNS);
        const startCol = (startBox - 1) % COLUMNS;

        const endRow = Math.floor((endBox - 1) / COLUMNS);
        const endCol = (endBox - 1) % COLUMNS;

        const minRow = Math.min(startRow, endRow);
        const maxRow = Math.max(startRow, endRow);

        const minCol = Math.min(startCol, endCol);
        const maxCol = Math.max(startCol, endCol);

        let selected = [];
        for (let i = minRow; i <= maxRow; i++) {
          for (let j = minCol; j <= maxCol; j++) {
            selected.push(i * COLUMNS + j + 1);
          }
        }

        setSelectedBox(selected);
      }
    },
    [isMouseDown]
  );

  console.log(selectedBox);

  return (
    <div className=" min-h-screen flex flex-col gap-10 items-center p-10">
      <h3 className="text-violet-700 text-3xl font-bold">Selectable Grid</h3>
      <div
        className="grid gap-1 select-none"
        style={{
          gridTemplateColumns: `repeat(${COLUMNS}, 35px)`,
          gridTemplateRows: `repeat(${ROWS}, 35px)`,
        }}
        onMouseUp={mouseUpHandler}
      >
        {[...Array(COLUMNS * ROWS).keys()].map((_, item) => {
          return (
            <div
              className={`flex justify-center items-center border border-violet-400 font-semibold ${
                selectedBox.includes(item + 1) ? "bg-violet-700 text-white" : ""
              }`}
              key={item}
              onMouseEnter={() => mouseEnterHandler(item + 1)}
              onMouseDown={() => mouseDownHandler(item + 1)}
            >
              {item + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectableGrid;
