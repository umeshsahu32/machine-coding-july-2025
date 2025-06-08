import { useState, useRef, useEffect, useCallback } from "react";

const FormDetails = (props) => {
  const { formData, resetBtn: resetBtnHandler } = props;

  const labelMapping = {
    name: "Name",
    email: "Email",
    dob: "Date of Birth",
    password: "Password",
  };

  const dataArray = Object.keys(formData).map((key) => ({
    label: labelMapping[key] || key,
    value: formData[key],
  }));

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <table className="w-[400px] shadow-lg border-collapse border-2 border-zinc-400">
        <tbody>
          <tr>
            <td
              colSpan="2"
              className="text-center text-zinc-700 p-4 bg-zinc-200 border border-zinc-300 font-bold text-lg"
            >
              Form Submitted Successfully!
            </td>
          </tr>
          {dataArray.map((item, index) => {
            return (
              <tr key={index}>
                <td className="p-3 border border-zinc-300 font-semibold bg-zinc-50">
                  {item.label}
                </td>
                <td className="p-3 border border-zinc-300">{item.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button
        onClick={resetBtnHandler}
        className="mt-5 px-5 py-2 bg-zinc-500 text-white rounded hover:bg-zinc-600 transition-colors"
      >
        Reset
      </button>
    </div>
  );
};

const UserForm = (props) => {
  const inputRef = useRef();

  const {
    handleSubmit,
    index,
    handleBack,
    forms,
    formData,
    handleInputChange,
  } = props;

  useEffect(() => {
    inputRef.current.focus();
  }, [index]);

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className=" flex flex-col gap-2">
        <label className="font-semibold text-md text-zinc-700">
          {forms[index].label}
        </label>
        <input
          ref={inputRef}
          required
          value={formData[forms[index].id]}
          id={forms[index].id}
          onChange={handleInputChange}
          type={forms[index].inputType}
          placeholder={forms[index].placeholder}
          className="w-full h-10 border-2 border-zinc-400 rounded-md px-3 focus:outline-zinc-500"
        />
        <div className="flex justify-around items-center w-full ">
          {index > 0 && (
            <button
              className="text-md my-5 px-3 py-2 bg-zinc-600 rounded-lg text-white font-bold transition-colors duration-200 hover:bg-zinc-700"
              onClick={handleBack}
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="text-md my-5 px-3 py-2 bg-zinc-600 rounded-lg text-white font-bold transition-colors duration-200 hover:bg-zinc-700"
          >
            {forms[index].buttonName}
          </button>
        </div>
      </div>
    </form>
  );
};

const MultiStepForm = () => {
  const data = [
    {
      id: "name",
      label: "Name",
      inputType: "text",
      buttonName: "Next",
      placeholder: "Your Name...",
    },
    {
      id: "email",
      label: "Email",
      inputType: "email",
      buttonName: "Next",
      placeholder: "Your Email...",
    },
    {
      id: "dob",
      label: "DOB",
      inputType: "date",
      buttonName: "Next",
      placeholder: "",
    },
    {
      id: "password",
      label: "Password",
      inputType: "password",
      buttonName: "Submit",
      placeholder: "",
    },
  ];
  const [forms, setForms] = useState(data);
  const [index, setIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    password: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleResetBtn = () => {
    setForms(data);
    setIndex(0);
    setFormData({ name: "", email: "", dob: "", password: "" });
    setIsFormSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (index === forms.length - 1) {
      console.log("Form submitted");
      setIsFormSubmitted(true);
    } else {
      setIndex((idx) => idx + 1);
    }
  };

  const handleBack = useCallback((e) => {
    e.preventDefault();
    setIndex((prev) => prev - 1);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="text-4xl font-bold text-zinc-700 mb-10">
        Multi Step Form
      </h1>

      <div className="w-[20%]">
        {!isFormSubmitted ? (
          <div>
            <p className="text-sm font-semibold text-zinc-600 mb-3 text-center">
              Step {index + 1} of {forms.length}
            </p>
            <UserForm
              index={index}
              forms={forms}
              formData={formData}
              handleBack={handleBack}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          </div>
        ) : (
          <FormDetails formData={formData} resetBtn={handleResetBtn} />
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
