// FormInput.js

import React from 'react';

const FormInput = ({ placeholder, id, setInputState, inputState }) => {
  const handleInput = (e) => {
    e.preventDefault();
    setInputState({ ...inputState, [id]: e.target.value });
  };

  const inputs = [
    {
      id: 'user',
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 'email',
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 'password',
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 'repeatPassword',
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: inputState.password,
      required: true,
    },
  ];
  
  return (
    <div className="formInput">
      <label className="lblForm">{placeholder}</label>
      <input
        name={id}
        placeholder={placeholder}
        className="InputForm"
        onChange={handleInput}
        value={inputState[id]}
      />
    </div>
  );
};

export default FormInput;
