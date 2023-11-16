"use client";

import { useState } from "react";

function FormInput(props) {

  const { name, label, errorMessage, handleInput, ...inputProps }
    = props;

  // console.log('porps', handleInput);

  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  const invalidLabelClass = focused ? '' : 'invalid';

  return (
    <div className="formInput">
      <label htmlFor={name} className={`block text-sm font-medium leading-6 text-gray-900`}>{label}</label>
      <div className={`mt-2`}>
        <input
          {...inputProps}
          onChange={(e) => handleInput(e)}
          id={name}
          name={name}
          onBlur={handleFocus}
          onFocus={() => name === "confirmPassword" && setFocused(true)}
          focused={focused.toString()}
          pattern={inputProps.pattern}
          value={inputProps.value}
          title={errorMessage}
          className="input-item"
        />
        <span data-js={`${name}-error-container`}>{errorMessage}</span>
      </div>
    </div>
  );
};

export { FormInput };