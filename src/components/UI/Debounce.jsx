import React, { useState, useEffect } from "react";
import debounceQuery from "../../utils/debounceQuery";

const Debounce = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    let value = e.target.value;
    setInput(e.target.value);
  };

  const initialApiCall = async () => {
    setLoading(true);
    const url = `https://api.frontendeval.com/fake/food/${input}`;
    const data = await debounceQuery(url);
    setList(data);
    setLoading(false);
  };

  useEffect(() => {
    if (input && input.length >= 2) {
      initialApiCall();
    }
  }, [input]);

  const inputClass =
    "h-10 m-6 border border-gray-400 outline-none rounded-lg text-center aspect-square w-[300px]";

  return (
    <div>
      <h1 className="text-4xl font-bold text-green-700">Debounce API Call</h1>
      <div className="flex flex-col justify-center items-center gap-2">
        <input
          className={inputClass}
          value={input}
          type="text"
          onChange={handleInputChange}
        />
        {loading && <span className="text-xl font-bold mb-6">Loading...</span>}
      </div>
      {list && list.length > 0 && (
        <div className="w-[300px] h-[300px] bg-gray-200 rounded-sm border cursor-pointer border-gray-300 text-2xl mx-5 my-auto text-left overflow-y-auto transition-all duration-200">
          {list.map((item, i) => (
            <div
              key={i}
              className="text-lg p-3 capitalize hover:bg-slate-600 hover:text-white"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Debounce;
