import React, { useState, useEffect } from "react";

const MIN = 0;
const MAX = 100;

const ProgressBarContainer = ({ value = 0, onComplete = () => {} }) => {
  const [percent, setPercent] = useState(value);

  useEffect(() => {
    setPercent(Math.min(Math.max(value, MIN), MAX));

    if (value >= MAX) {
      onComplete();
    }
  }, [value]);

  return (
    <div className="relative h-8 w-[500px] bg-slate-300 border-2 border-slate-900 rounded-2xl overflow-hidden">
      <span
        className={`absolute w-[100%] flex justify-center items-center z-50 ${
          percent > 49 ? "text-white" : "text-slate-950"
        }`}
      >
        {percent.toFixed()}%
      </span>
      <div
        className="bg-[#00c251] text-white h-full text-center"
        style={{
          transform: `scaleX(${percent / MAX})`,
          transformOrigin: "left",
        }}
        // style={{ width: `${percent}%` }}
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={percent}
        role="progressbar"
      />
    </div>
  );
};

const ProgressBar = () => {
  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setValue((val) => val + 0.1);
    }, 20);
  }, []);

  return (
    <div className="flex w-full flex-col justify-center items-center gap-2">
      <span>Progress Bar</span>
      <ProgressBarContainer value={value} onComplete={() => setSuccess(true)} />
      <span>{success ? "Complete!" : "Loading..."}</span>
    </div>
  );
};

export default ProgressBar;
