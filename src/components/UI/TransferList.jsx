import { useState } from "react";

const data = [
  { title: "First", id: 0, checked: false },
  { title: "Second", id: 1, checked: false },
  { title: "Third", id: 2, checked: false },
  { title: "Fourth", id: 3, checked: false },
  { title: "Fifth", id: 4, checked: false },
];

const TransferList = () => {
  const [leftItems, setLeftItems] = useState(data);
  const [rightItems, setRightItems] = useState([]);

  const checkedList = (list, id, checked) => {
    return list.map((item) => {
      if (id === item.id) {
        return {
          ...item,
          checked: !checked,
        };
      }
      return item;
    });
  };

  const handleClick = (id, checked, direction) => {
    const list = direction === "LEFT" ? leftItems : rightItems;
    const updatedList = checkedList(list, id, checked);
    direction === "LEFT"
      ? setLeftItems(updatedList)
      : setRightItems(updatedList);
  };

  const resetItems = (list) => {
    return list.map((item) => {
      return {
        ...item,
        checked: false,
      };
    });
  };

  const handleTransferBtn = (dir) => {
    if (dir === "LEFT_TO_RIGHT") {
      if (leftItems.length) {
        const copyList = [...leftItems];
        const checkList = copyList.filter((item) => item.checked);
        const unCheckList = copyList.filter((item) => !item.checked);
        setRightItems(resetItems([...rightItems, ...checkList]));
        setLeftItems(unCheckList);
      }
    } else {
      const copyList = [...rightItems];
      const checkList = copyList.filter((item) => item.checked);
      const unCheckList = copyList.filter((item) => !item.checked);
      setLeftItems(resetItems([...leftItems, ...checkList]));
      setRightItems(unCheckList);
    }
  };

  const isSomeItemChecked = (list) => {
    return list.some((item) => item.checked);
  };

  const boxContainerClass =
    "w-[220px] h-[280px] p-2  bg-gray-100 border border-gray-300";

  const boxClass =
    "h-10 mb-2 bg-blue-100 transition-all duration-200 hover:bg-blue-300 text-xl border border-slate-400 flex justify-center items-center cursor-pointer";

  const btnClass =
    "w-[200px] h-10 border-none bg-blue-700 transition-colors duration-200 hover:bg-blue-800 text-white rounded-lg text-xl";

  // JSX START
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="text-4xl pb-5 font-bold text-violet-700">Transfer List</h1>
      <div className="flex justify-center items-center gap-7">
        {/* left box */}
        <div className={boxContainerClass}>
          {leftItems.length === 0 ? (
            <p className="text-center mt-10 text-xl font-bold">No Items</p>
          ) : (
            leftItems.map(({ title, id, checked }) => (
              <div
                key={id}
                onClick={() => handleClick(id, checked, "LEFT")}
                className={`${boxClass} ${
                  checked ? "bg-blue-600 text-white" : ""
                }`}
              >
                {title}
              </div>
            ))
          )}
        </div>
        {/* action buttons */}
        <div className="flex flex-col gap-6">
          <button
            className={`${btnClass} ${
              isSomeItemChecked(leftItems)
                ? ""
                : "cursor-not-allowed opacity-50"
            }`}
            onClick={() => handleTransferBtn("LEFT_TO_RIGHT")}
            disabled={!isSomeItemChecked(leftItems)}
          >
            Left to Right
          </button>
          <button
            className={`${btnClass} ${
              isSomeItemChecked(rightItems)
                ? ""
                : "cursor-not-allowed opacity-50"
            }`}
            onClick={() => handleTransferBtn("RIGHT_TO_LEFT")}
            disabled={!isSomeItemChecked(rightItems)}
          >
            Right to Left
          </button>
        </div>
        {/* right box */}
        <div className={boxContainerClass}>
          {rightItems.length === 0 ? (
            <p className="text-center mt-10 text-xl font-bold">No Items</p>
          ) : (
            rightItems.map(({ title, id, checked }) => (
              <div
                key={id}
                onClick={() => handleClick(id, checked, "RIGHT")}
                className={`${boxClass} ${
                  checked ? "bg-blue-600 text-white" : ""
                }`}
              >
                {title}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TransferList;
