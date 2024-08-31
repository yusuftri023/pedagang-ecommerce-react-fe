import { forwardRef, useState } from "react";

/* eslint-disable react/prop-types */
function InputComponent(
  { placeholder, inputType, defaultValue = null, maxLength = undefined },
  ref
) {
  const [currentInput, setCurrentInput] = useState(defaultValue);
  const [inputCounter, setInputCounter] = useState(defaultValue?.length || 0);
  const handleCounterChange = (e) => {
    setInputCounter(e.target.value.length);
  };
  const inputId = placeholder
    .split(" ")
    .map((val) => val.toLocaleLowerCase())
    .join("-");

  return (
    <div className="relative group">
      <div
        className={
          (currentInput?.length > 0
            ? "translate-y-0 bg-white px-1 z-0 text-sm ml-1"
            : "translate-y-full ml-4 -z-10") +
          ` absolute top-0  text-gray-500 font-medium group-focus-within:translate-y-0 group-focus-within:bg-white group-focus-within:px-1 group-focus-within:z-0 group-focus-within:ml-1 group-focus-within:text-sm transition-all duration-100 `
        }
      >
        {placeholder}
      </div>
      <label htmlFor={inputId}> </label>
      {inputType !== "textarea" && (
        <input
          ref={ref}
          id={inputId}
          name={inputId}
          className={`w-full rounded-md border-[1px] border-gray-300 p-2 mt-4 outline-none bg-transparent `}
          onBlur={(e) => setCurrentInput(e.target.value)}
          onChange={handleCounterChange}
          type={inputType}
          defaultValue={defaultValue}
          maxLength={maxLength}
        />
      )}
      {inputType === "textarea" && (
        <textarea
          ref={ref}
          id={inputId}
          name={inputId}
          className={`w-full rounded-md border-[1px] border-gray-300 p-2 mt-4 outline-none bg-transparent resize-none `}
          onBlur={(e) => setCurrentInput(e.target.value)}
          onChange={handleCounterChange}
          defaultValue={defaultValue}
          rows={4}
          maxLength={maxLength}
        />
      )}
      <div className="flex flex-row-reverse mx-4">
        <span className="text-gray-600 text-sm font-medium">
          {inputCounter}/{maxLength}
        </span>
      </div>
    </div>
  );
}
const InputText = forwardRef(InputComponent);

export default InputText;
