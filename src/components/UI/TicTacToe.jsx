import React, { useState } from "react";

const initializeGame = () => Array(9).fill(null);

const TicTacToe = () => {
  const [board, setBoard] = useState(initializeGame());
  const [isXTurn, setIsXTurn] = useState(true);

  const WINNING_PATTERN = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (currentBoard) => {
    for (let i = 0; i < WINNING_PATTERN.length; i++) {
      const [a, b, c] = WINNING_PATTERN[i];
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }

    return null;
  };

  const handleClick = (index) => {
    const winner = calculateWinner(board);
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const GameStatus = () => {
    const winner = calculateWinner(board);
    if (winner) return `Player ${winner} Won`;
    if (!board.includes(null)) return "Its a Draw";
    return `${isXTurn ? "X" : "O"} Turn`;
  };

  const resetBtnHandler = () => {
    setBoard(initializeGame());
    setIsXTurn(true);
  };

  return (
    <div className=" min-h-screen flex flex-col gap-10 items-center p-10">
      <h3 className="text-4xl font-bold text-blue-700"> Tic Tac Toe</h3>
      <div className="grid grid-cols-3 gap-4">
        {board.map((item, index) => {
          return (
            <button
              className={`w-24 h-24 rounded-lg shadow-lg transition-all duration-200 ease-in-out ${
                item === "X"
                  ? "bg-red-500 text-white"
                  : item === "O"
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
              key={index}
              onClick={() => handleClick(index)}
            >
              {item ? item : "?"}
            </button>
          );
        })}
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <h5 className="text-xl font-bold text-blue-500">{GameStatus()}</h5>
        <button
          className="px-6 py-3 border rounded-lg shadow-lg border-blue-700 transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white"
          onClick={resetBtnHandler}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
