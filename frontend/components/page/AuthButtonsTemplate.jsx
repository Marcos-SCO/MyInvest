import React from 'react';

import SignInGoogle from '../auth/SignInBtnGoogle';

const baseUrl = process.env.FRONT_END_BASE_URL;

export default function AuthButtonsTemplate({ templateTitle = false }) {
  return (
    <section className='auth-buttons-container'>
      <div className='flex flex-col'>

        {templateTitle &&
          <div className='tittle-container'>
            <p>{templateTitle}</p>
          </div>
        }

        <div className='flex flex-wrap justify-around button-container'>
          <SignInGoogle />
          <a href={`${baseUrl}/signUp`} className="myButton">
            <span>Cadastre-se com seu e-mail</span>
          </a>
        </div>
      </div>
    </section>
  )
}
