import { useState } from "react";
import { FORM_FIELDS } from "../../utils/formFields";

function FormValidation() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    const field = FORM_FIELDS[name];

    // Check if field is required and empty
    if (field.required && !value.trim()) {
      return field.errorMsg;
    }

    // Email validation
    if (name === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address";
      }
    }

    // Password confirmation validation
    if (name === "confirmPassword" && value !== formData.password) {
      return "Passwords do not match";
    }

    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate field if it has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));

      // Re-validate confirm password if password changes
      if (
        name === "password" &&
        formData.confirmPassword &&
        touched.confirmPassword
      ) {
        const confirmError = validateField(
          "confirmPassword",
          formData.confirmPassword
        );
        setErrors((prev) => ({
          ...prev,
          confirmPassword: confirmError,
        }));
      }
    }
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;

    // Mark field as touched
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate field
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(FORM_FIELDS).forEach((fieldName) => {
      const value = formData[fieldName] || "";
      const error = validateField(fieldName, value);

      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(FORM_FIELDS).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      )
    );

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted successfully:", formData);
      alert("Form submitted successfully!");

      // Reset form after successful submission
      setFormData({});
      setErrors({});
      setTouched({});
    } else {
      console.log("Form has validation errors");
    }
  };

  const renderFormField = (fieldName) => {
    const field = FORM_FIELDS[fieldName];
    const value = formData[fieldName] || "";
    const error = errors[fieldName];
    const hasError = error && touched[fieldName];

    const inputClasses = `w-full px-3 py-2 border-2 rounded-lg text-base transition-all duration-300 ease-in-out box-border focus:outline-none ${
      hasError
        ? "border-red-500 ring-4 ring-red-100"
        : "border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
    }`;

    return (
      <div key={fieldName} className="mb-3 flex justify-start items-center">
        <label
          htmlFor={fieldName}
          className="block mb-2 text-gray-600 font-medium text-sm min-w-[150px]"
        >
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div>
          <input
            id={fieldName}
            name={fieldName}
            type={field.type}
            placeholder={field.placeholder}
            value={value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className={inputClasses}
          />
          {hasError && (
            <span className="block text-red-500 text-sm mt-1 font-medium">
              {error}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md w-full  px-8 py-4">
        <h2 className="text-center mb-8 text-purple-700 text-3xl font-bold">
          Registration Form
        </h2>
        <div onSubmit={handleSubmit}>
          {Object.keys(FORM_FIELDS).map(renderFormField)}

          <button
            type="submit"
            className="w-full px-2 py-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0 rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 ease-in-out mt-4 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-400/40 active:translate-y-0"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormValidation;
