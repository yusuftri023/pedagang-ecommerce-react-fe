/* eslint-disable no-unused-vars */
import { forwardRef, useState } from "react";

/* eslint-disable react/prop-types */
function InputComponent(
  { placeholder, inputType, defaultValue = null, maxLength = undefined },
  ref,
) {
  const [currentInput, setCurrentInput] = useState(defaultValue);
  const [inputCounter, setInputCounter] = useState(defaultValue?.length || 0);

  const inputId = placeholder
    .split(" ")
    .map((val) => val.toLocaleLowerCase())
    .join("-");

  return (
    <div className="group relative mt-2">
      <div>
        <span>{placeholder}</span>
      </div>
      <label htmlFor={inputId}> </label>
      {inputType !== "textarea" && (
        <>
          <input
            ref={ref}
            id={inputId}
            name={inputId}
            className={`mt-2 w-full rounded-md border-[1px] border-gray-300 bg-white p-2 text-black outline-none `}
            onBlur={(e) => setCurrentInput(e.target.value)}
            type={inputType}
            defaultValue={defaultValue}
            maxLength={maxLength}
            placeholder={placeholder}
          />
        </>
      )}
      {inputType === "textarea" && (
        <textarea
          ref={ref}
          id={inputId}
          name={inputId}
          className={`mt-4 w-full resize-none rounded-md border-[1px] border-gray-300 bg-transparent p-2 outline-none `}
          onBlur={(e) => setCurrentInput(e.target.value)}
          defaultValue={defaultValue}
          rows={4}
          maxLength={maxLength}
        />
      )}
    </div>
  );
}
const InputForm = forwardRef(InputComponent);
export default InputForm;
