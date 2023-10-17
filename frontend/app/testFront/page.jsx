'use client'

import React, { useState } from 'react';
import FormInput from './testComp/FormInput';
import FormText from './testComp/FormText';
import FormButton from './testComp/FormButton';

const TestFront = () => {

  const [inputState, setInputState] = useState({
    user: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  console.log(inputState);

  return (
    <>
      <body className="form-page">
          <div className='testForm'>
            
            <FormText placeholder="SignUp"/>
              
            <FormInput
              placeholder="Username"
              id="user"
              setInputState={setInputState}
              inputState={inputState}
            />
            <FormInput
              placeholder="E-Mail"
              id="email"
              setInputState={setInputState}
              inputState={inputState}
            />
            <FormInput
              placeholder="Password"
              id="password"
              setInputState={setInputState}
              inputState={inputState}
            />
            <FormInput
              placeholder="Repeat your Password"
              id="repeatPassword"
              setInputState={setInputState}
              inputState={inputState}
            />
            <div className='FB-Div'>
              <FormButton/>
            </div>
        
          </div>
      </body>
    </>
  );
};

export default TestFront;