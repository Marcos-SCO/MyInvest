'use client'

import SignInGoogle from "@/components/GoogleBtnRec";

import CadText from "@/components/CadText";

import React, { useState } from 'react';
import FormInput from './testComp/FormInput';
import FormText from './testComp/FormText';
import FormButton from './testComp/FormButton';
import Image from "next/image";
import Logo from '@/components/Logo'

const Login = () => {

  const [inputState, setInputState] = useState({
    user: '',
    email: '',
    password: '',
  });

  console.log(inputState);

  return (
    <div className="Login">

        <div className="Logo-Div">
          <Image src="/logo.jpeg" height={125} width={125} alt="Logo" className="Logo-Img1"/>
        </div>
          
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
    </div>
  )
};

export default Login;