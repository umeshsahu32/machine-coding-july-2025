import React, { useState, useEffect } from "react";

const CryptoConverter = () => {
  const currencyArray = ["usd", "eur", "gbp", "cny", "jpy"];
  const [currency, setCurrency] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [convertedCurrency, setConvertedCurrency] = useState(0);
  const [isUp, setIsUp] = useState(true);
  const [difference, setDifference] = useState(0);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setCurrency(val);
  };

  const handleCurrencyType = (e) => {
    const type = e.target.value;
    setSelectedCurrency(type);
  };

  const fetchCurrencyInfo = async () => {
    try {
      const url = `https://api.frontendeval.com/fake/crypto/${selectedCurrency}`;
      const result = await fetch(url);
      const data = await result.json();
      const val = data.value;
      const showCurr = currency * val;
      setConvertedCurrency(showCurr.toFixed(2));

      const prevVal = window.sessionStorage.getItem("prevVal");
      const diff = showCurr.toFixed(2) - prevVal;
      diff < 0 ? setIsUp(false) : setIsUp(true);
      setDifference(diff.toFixed(2));

      window.sessionStorage.setItem("prevVal", showCurr.toFixed(2));
    } catch (err) {
      console.error("Error : ", err);
    }
  };

  useEffect(() => {
    let time;
    time = setInterval(() => {
      fetchCurrencyInfo();
    }, 3000);
    return () => {
      clearInterval(time);
    };
  }, [currency, selectedCurrency]);

  const inputClass =
    "h-10 m-6 border border-gray-400 outline-none rounded-lg text-center aspect-square w-[160px]";

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-4xl font-bold text-green-700">Crypto Convert App</h1>
      <div className="mt-6">
        <input
          className={inputClass}
          type="number"
          value={currency}
          onChange={handleInputChange}
          placeholder="Enter Amount"
        />

        <select
          onChange={handleCurrencyType}
          name="currency"
          value={selectedCurrency}
          className={inputClass}
        >
          {currencyArray.map((curr) => (
            <option key={curr} value={curr}>
              {curr.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between items-center w-[400px] text-3xl">
        <div>{convertedCurrency}</div>
        <div>WUC</div>
        <div className={isUp ? "text-green-600" : "text-red-600"}>
          <span>{isUp ? "↑" : "↓"}</span>
          <span>{difference}</span>
        </div>
      </div>
    </div>
  );
};

export default CryptoConverter;
