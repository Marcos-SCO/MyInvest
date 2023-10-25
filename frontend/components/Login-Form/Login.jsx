'use client'

import SignInGoogle from "@/components/GoogleBtnRec";

import CadText from "@/components/CadText";

import React, { useState } from 'react';
import FormInput from './testComp/FormInput';
import FormText from './testComp/FormText';
import FormButton from './testComp/FormButton';

const Login = () => {

  const [inputState, setInputState] = useState({
    user: '',
    email: '',
    password: '',
  });

  console.log(inputState);

  return (
    <>
          <div className='Form-Login'>
            
            <FormText placeholder="Acessar Conta"/>
            
            <FormInput
              placeholder="E-Mail"
              id="email"
              setInputState={setInputState}
              inputState={inputState}
            />
            <FormInput
              placeholder="Senha"
              id="password"
              setInputState={setInputState}
              inputState={inputState}
            />
            <div className='FB-Div'>
              <FormButton/>
            </div>

            <h3 className="g-h3">ou faça login com:</h3>

            <div className="G-Btn">
              <SignInGoogle placeholder="Login"/>
            </div>

            <div>
              <CadText/>
            </div>
        
          </div>
    </>
  )
};

export default Login;