'use client'

import SignInGoogle from "@/components/GoogleBtn";

import React, { useState } from 'react';
import FormInput from './testComp/FormInput';
import FormText from './testComp/FormText';
import FormButton from './testComp/FormButton';

const TestFront = () => {

  const [inputState, setInputState] = useState({
    user: '',
    email: '',
    password: '',
  });

  console.log(inputState);

  return (
    <>
      <body className="form-page">
          <div className='testForm'>
            
            <FormText placeholder="Sign In"/>
              
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
            <div className='FB-Div'>
              <FormButton/>
            </div>

            <h3 className="g-h3">Fazer Login com o Google:</h3>

            <div className="G-Btn">
              <SignInGoogle/>
            </div>
        
          </div>
      </body>
    </>
  )
};

export default TestFront;