import { useState } from "react";

const ChipsInput = () => {
  const [value, setValue] = useState("");
  const [chips, setChips] = useState([]);

  const handleEnterButton = (e) => {
    if (value.trim() === "") return;
    if (e.key === "Enter") {
      setChips((prev) => [...prev, { id: Date.now(), value }]);
      setValue("");
    }
  };

  const removeChipHandler = (chipId) => {
    const copyChips = [...chips];
    const updatedChips = copyChips.filter((item) => item.id !== chipId);
    setChips(updatedChips);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-4xl font-bold text-sky-700 mb-10">Chips Input</h1>
      <div>
        <input
          type="text"
          className="w-[400px] px-3 h-12 text-gray-900 text-xl bg-gray-200 border-2 border-gray-400 rounded-md focus:outline-sky-800"
          placeholder="Enter Text..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => handleEnterButton(e)}
        />
      </div>
      {chips?.length > 0 && (
        <div className="flex flex-wrap gap-4 max-w-[600px] py-8">
          {chips?.map((item) => {
            return (
              <div className="bg-sky-600 text-white px-3 py-2 rounded-md flex justify-between gap-4 ">
                <p key={item.id} className="capitalize">
                  {item.value}
                </p>
                <button
                  className="cursor-pointer transition-all duration-200 bg-sky-900 px-2 hover:bg-sky-950"
                  onClick={() => removeChipHandler(item.id)}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChipsInput;
