import { forwardRef, useState } from "react";

/* eslint-disable react/prop-types */
function InputComponent(
  { placeholder, inputType, defaultValue = null, maxLength = undefined },
  ref,
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
    <div className="group relative">
      <div
        className={
          (currentInput?.length > 0
            ? "z-0 ml-1 translate-y-0 bg-white px-1 text-sm"
            : "-z-10 ml-4 translate-y-full") +
          ` absolute top-0  font-medium text-gray-500 transition-all duration-100 group-focus-within:z-0 group-focus-within:ml-1 group-focus-within:translate-y-0 group-focus-within:bg-white group-focus-within:px-1 group-focus-within:text-sm `
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
          className={`mt-4 w-full rounded-md border-[1px] border-gray-300 bg-transparent p-2 outline-none `}
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
          className={`mt-4 w-full resize-none rounded-md border-[1px] border-gray-300 bg-transparent p-2 outline-none `}
          onBlur={(e) => setCurrentInput(e.target.value)}
          onChange={handleCounterChange}
          defaultValue={defaultValue}
          rows={4}
          maxLength={maxLength}
        />
      )}
      <div className="mx-4 flex flex-row-reverse">
        <span className="text-sm font-medium text-gray-600">
          {inputCounter}/{maxLength}
        </span>
      </div>
    </div>
  );
}
const InputText = forwardRef(InputComponent);

export default InputText;
