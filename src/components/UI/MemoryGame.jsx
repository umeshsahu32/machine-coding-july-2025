import React, { useState, useEffect } from "react";

const MemoryGame = () => {
  const [numbers, setNumbers] = useState([]);
  const [filliped, setFilliped] = useState([]);
  const [solved, setSolved] = useState([]);

  const [won, setWon] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const GRID_SIZE = 4;

  const initializeNumbers = () => {
    const numberCount = GRID_SIZE ** 2;
    const pairCount = Math.floor(numberCount / 2);
    const numberArray = [];
    for (let i = 1; i <= pairCount; i++) {
      numberArray.push(i);
      numberArray.push(i);
    }

    numberArray.sort(() => Math.random() - 0.5);
    setNumbers(numberArray);
    setFilliped([]);
    setSolved([]);
    setWon(false);
    setDisabled(false);
  };

  useEffect(() => {
    initializeNumbers();
  }, []);

  const checkMatch = (secondIndex) => {
    const firstVal = numbers[filliped[0]];
    const secondVal = numbers[secondIndex];
    if (firstVal === secondVal) {
      setSolved((prev) => [...prev, firstVal, secondVal]);
      setFilliped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFilliped([]);
        setDisabled(false);
      }, 300);
    }
  };

  const handleClick = (index) => {
    if (won || disabled) return;

    if (filliped.length === 0) {
      setFilliped([index]);
    }

    if (filliped.length === 1) {
      setDisabled(true);
      if (index !== filliped[0]) {
        setFilliped((prev) => [...prev, index]);
        checkMatch(index);
      } else {
        setFilliped([]);
        setDisabled(false);
      }
    }
  };

  const isFilliped = (index) => filliped.includes(index);

  const isSolved = (index) => solved.includes(numbers[index]);

  useEffect(() => {
    if (solved.length === numbers.length && solved.length > 0) {
      setWon(true);
    }
  }, [solved]);

  return (
    <div className="bg-violet-50 flex flex-col gap-5 px-10 items-center">
      <h3 className="text-4xl pb-5 font-bold text-violet-700">Memory Game</h3>
      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
      >
        {numbers.map((item, index) => {
          return (
            <button
              className={`w-20 h-20 rounded-lg shadow-md btnTransition ${
                isSolved(index)
                  ? "bg-green-700 text-white"
                  : isFilliped(index)
                  ? "bg-blue-700 text-white"
                  : "bg-gray-300 text-slate-800"
              }`}
              key={index}
              onClick={() => handleClick(index)}
            >
              {isFilliped(index) || isSolved(index) ? item : "?"}
            </button>
          );
        })}
      </div>
      {won && (
        <div className="flex flex-col gap-4 items-center mb-5">
          <span className="text-xl font-bold text-violet-700">You Won</span>
          <button
            onClick={initializeNumbers}
            className="px-4 py-2 rounded-lg border border-violet-700 shadow-lg btnTransition hover:bg-violet-800 hover:text-white"
          >
            Reset Game
          </button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
