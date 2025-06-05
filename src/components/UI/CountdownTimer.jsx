import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [isStart, setIsStart] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timerId, setTimerId] = useState("");

  // HANDLE CHANGE FUNCTION
  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    const id = e.target.id;

    if (id === "hours") {
      setHours(value);
    } else if (id === "minutes") {
      setMinutes(value);
    } else {
      setSeconds(value);
    }
  };

  // RUN TIMER FUNCTION
  const runTimer = (hh, mm, ss, tid) => {
    if (ss > 0) {
      setSeconds((s) => s - 1);
    } else if (ss === 0 && mm > 0) {
      setMinutes((m) => m - 1);
      setSeconds(59);
    } else {
      setHours((h) => h - 1);
      setMinutes(59);
      setSeconds(59);
    }

    if (hh === 0 && ss === 0 && mm === 0) {
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      clearInterval(tid);
      alert("Timer is complete...!!");
      return;
    }
  };

  // USE-EFFECT WHICH IS RESPONSIBLE FOR START THE TIMER
  useEffect(() => {
    let tid;

    if (isStart) {
      tid = setInterval(() => {
        runTimer(hours, minutes, seconds, tid);
      }, 1000);
    }
    setTimerId(tid);

    return () => {
      clearInterval(tid);
    };
  }, [isStart, hours, minutes, seconds]);

  // START BUTTON HANDLER
  const startHandler = () => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      console.log(hours, minutes, seconds);
      alert("Please enter valid values");
      return;
    } else {
      setIsStart(true);
    }
  };

  // RESET BUTTON HANDLER
  const resetBtnHandler = () => {
    setIsStart(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    clearInterval(timerId);
  };

  // RESUME BUTTON HANDLER
  const resumeBtnHandler = () => {
    setIsPaused(false);
    runTimer(hours, minutes, seconds, timerId);
  };

  // PAUSE BUTTON HANDLER
  const pauseBtnHandler = () => {
    setIsPaused(true);
    clearInterval(timerId);
  };

  // BUTTON AND INPUT CLASS
  const inputClass =
    "w-16 h-16 m-6 text-center text-2xl border-2 border-pink-300 shadow-sm rounded-lg outline-none";
  const btnClass =
    "bg-pink-700 hover:bg-pink-800 transition-colors duration-300 px-4 py-2 text-white rounded-lg text-2xl cursor-pointer";

  // JSX RETURN
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h2 className="text-4xl text-pink-800 font-bold mb-10">
        Countdown Timer
      </h2>
      {!isStart && (
        <div className="flex flex-col justify-center items-center gap-5">
          <div>
            <input
              placeholder="HH"
              id="hours"
              onChange={handleChange}
              className={inputClass}
            />
            <input
              placeholder="MM"
              id="minutes"
              onChange={handleChange}
              className={inputClass}
            />
            <input
              placeholder="SS"
              id="seconds"
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <button onClick={startHandler} className={btnClass}>
            Start
          </button>
        </div>
      )}
      {isStart && (
        <div className="flex flex-col gap-10 ">
          <div className="flex justify-between items-center gap-5 text-5xl font-bold text-blue-700">
            <div>{hours < 10 ? `0${hours}` : hours}</div>
            <span>:</span>
            <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
            <span>:</span>
            <div>{seconds < 10 ? `0${seconds}` : seconds}</div>
          </div>
          <div className="flex justify-around items-center">
            <button
              className={btnClass}
              onClick={isPaused ? resumeBtnHandler : pauseBtnHandler}
            >
              {isPaused ? "Resume" : "Pause"}
            </button>
            <button onClick={resetBtnHandler} className={btnClass}>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
