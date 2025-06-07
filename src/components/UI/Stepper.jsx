import { useState, useEffect, useRef } from "react";
import { CHECKOUT_STEPS } from "../../utils/stepperData.jsx";

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[CHECKOUT_STEPS.length - 1].offsetWidth / 2,
    });
  }, [stepRef, CHECKOUT_STEPS.length]);

  if (!CHECKOUT_STEPS.length) {
    return <></>;
  }
  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === CHECKOUT_STEPS.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (CHECKOUT_STEPS.length - 1)) * 100;
  };

  const ActiveComponent = CHECKOUT_STEPS[currentStep - 1]?.Component;

  // JSX START
  return (
    <div className="flex w-full justify-center items-center gap-5 flex-col">
      <h1 className="text-4xl font-bold text-green-700 mb-10">Stepper</h1>

      {/* STEP NUMBER */}
      <div className="relative w-[70%] flex justify-between items-center mb-5 ">
        {CHECKOUT_STEPS.map((step, index) => {
          return (
            <div
              key={step.name}
              ref={(el) => (stepRef.current[index] = el)}
              className="flex flex-col items-center"
            >
              <div
                className={`w-12 h-12 rounded-full  flex items-center justify-center mb-2 z-10 ${
                  currentStep > index + 1 || isComplete
                    ? "bg-green-800 text-white"
                    : currentStep === index + 1
                    ? "bg-blue-700 text-white"
                    : "bg-gray-400"
                }`}
              >
                {currentStep > index + 1 || isComplete ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="text-lg">{step.name}</div>
            </div>
          );
        })}

        {/* PROGRESS BAR */}
        <div
          className="absolute top-[25%] left-0 h-1 bg-gray-500"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="h-full bg-[#28a745] transition-all duration-200 ease-in"
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>

      {/* ACTIVE COMPONENT */}
      <ActiveComponent />

      {/* NEXT BUTTON */}
      {!isComplete && (
        <button
          className="text-xl px-5 py-2 border-none outline-none rounded-md bg-green-600 text-white transition-all duration-200 hover:bg-green-700"
          onClick={handleNext}
        >
          {currentStep === CHECKOUT_STEPS.length ? "Finish" : "Next"}
        </button>
      )}
    </div>
  );
};

export default Stepper;
