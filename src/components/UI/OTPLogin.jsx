import { useState, useRef, useEffect } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    // submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div>
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            ref={(input) => (inputRefs.current[index] = input)}
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-16 h-16 m-3 text-center text-2xl outline outline-2 outline-gray-200 focus:outline-green-700"
          />
        );
      })}
    </div>
  );
};

const OTPLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showVerifyBtn, setShowVerifyBtn] = useState(false);

  const phoneInputRef = useRef();

  useEffect(() => {
    phoneInputRef.current.focus();
  }, []);

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePhoneSubmit = (event) => {
    event.preventDefault();

    // phone validations
    const phoneRegex = /^[6-9]\d{9}$/; // Typical Indian mobile number
    if (!phoneRegex.test(phoneNumber)) {
      alert("Please enter a valid 10-digit phone number starting with 6-9.");
      return;
    }
    setShowOtpInput(true);
  };

  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      handlePhoneSubmit(e);
    }
  };

  const onOtpSubmit = (otp) => {
    console.log("OTP", otp);
    setShowVerifyBtn(true);
  };

  const onVerifyClickHandler = () => {
    alert("Login successful");
    setPhoneNumber("");
    setShowOtpInput(false);
    setShowVerifyBtn(false);
  };

  // JSX START
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="text-4xl font-bold text-green-700 mb-3">OTP Login</h1>
      {!showOtpInput ? (
        <form
          className="flex flex-col justify-center items-center gap-4"
          onSubmit={handlePhoneSubmit}
        >
          <input
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            maxLength={10}
            ref={phoneInputRef}
            value={phoneNumber}
            onChange={handlePhoneNumber}
            onKeyDown={keyDownHandler}
            placeholder="Enter Phone Number"
            className="w-[300px] p-2 h-12 rounded-md border-2 border-gray-300 outline-none"
          />
          <button
            className="bg-gray-200 border-2 border-gray-500 rounded px-3 py-2 transition-all hover:bg-gray-300"
            type="submit"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="flex flex-col gap-5 justify-center items-center">
          <p className="text-2xl">
            Enter OTP sent to{" "}
            <span className="font-bold text-green-800">{phoneNumber}</span>
          </p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
          {showVerifyBtn && (
            <button
              onClick={onVerifyClickHandler}
              className="bg-gray-200 border-2 border-gray-500 rounded px-3 py-2 transition-all hover:bg-gray-300"
            >
              Verify
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default OTPLogin;
