import React, { useState } from "react";
import usePasswordGenerator from "../../hooks/usePasswordGenerator";

const PasswordStrengthIndicator = ({ password = "" }) => {
  const getPasswordStrength = () => {
    const passwordLength = password.length;

    if (passwordLength < 1) {
      return "";
    } else if (passwordLength < 4) {
      return "Very Weak";
    } else if (passwordLength < 8) {
      return "Poor";
    } else if (passwordLength < 12) {
      return "Medium";
    } else if (passwordLength < 16) {
      return "Strong";
    } else {
      return "Very Strong";
    }
  };

  const passwordStrength = getPasswordStrength();

  if (!passwordStrength) return <React.Fragment />;

  return (
    <div className="w-full flex justify-between pb-3 text-white">
      Strength: <span className="font-bold">{passwordStrength}</span>
    </div>
  );
};

const PasswordGenerator = () => {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);
  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (index) => {
    const updateCheckboxData = [...checkboxData];
    updateCheckboxData[index].state = !updateCheckboxData[index].state;
    setCheckboxData(updateCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  const btnClass =
    "p-2 rounded border-none bg-[#2a8b8b] text-white uppercase font-bold cursor-pointer";

  return (
    <div className="bg-[#24232b] p-6 w-[50%]">
      {password && (
        <div className="flex justify-between text-2xl font-bold text-white pb-6">
          <div>{password}</div>
          <button
            className={`h-[30px] text-xs ${btnClass}`}
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
      <div className="flex flex-col text-white text-xl font-bold pb-6">
        <span className="w-full flex justify-between pb-6">
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 text-lg font-bold text-white">
        {checkboxData.map((checkbox, index) => {
          return (
            <div key={index} className="flex gap-2 pb-6">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(index)}
                checked={checkbox.state}
              />
              <label>{checkbox.title}</label>
            </div>
          );
        })}
      </div>

      {/* Strength */}
      <PasswordStrengthIndicator password={password} />

      {/* Error Handling */}
      {errorMessage && <div className="text-red-700 pb-1">{errorMessage}</div>}

      {/* Generate Button */}
      <button
        className={`w-full text-xl p-5 ${btnClass}`}
        onClick={() => generatePassword(checkboxData, length)}
      >
        Generate Password
      </button>
    </div>
  );
};

export default PasswordGenerator;
