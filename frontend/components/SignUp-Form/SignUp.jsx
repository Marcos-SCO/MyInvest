'use client'

import React, { useState } from 'react';
import FormInput from './testComp/FormInput';
import FormText from './testComp/FormText';
import FormButton from './testComp/FormButton';

import SignInGoogle from "@/components/GoogleBtnRec";

import LogText from "@/components/LogText"

const SignUp = () => {

  const [inputState, setInputState] = useState({
    user: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  console.log(inputState);

  return (
    <>
          <div className='Form-SignUp'>
            
            <FormText placeholder="Cadastro"/>
              
            <FormInput
              placeholder="Nome de Usuário"
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
              placeholder="Senha"
              id="password"
              setInputState={setInputState}
              inputState={inputState}
            />
            <FormInput
              placeholder="Repita sua Senha"
              id="repeatPassword"
              setInputState={setInputState}
              inputState={inputState}
            />
            <div className='FB-Div'>
              <FormButton/>
            </div>

            <h3 className="g-h3">ou cadastre-se com:</h3>

            <div className="G-Btn">
              <SignInGoogle placeholder="Cadastro"/>
            </div>

            <div>
              <LogText/>
            </div>
        
          </div>
    </>
  )
};

export default SignUp;