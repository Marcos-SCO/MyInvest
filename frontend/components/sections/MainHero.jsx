import React from 'react';

import SignInGoogle from "../auth/SignInBtnGoogle";
import Link from 'next/link';

const baseUrl = process.env.FRONT_END_BASE_URL;

export default function MainHero({ ...props }) {

  const { id, name, userId, firstName, token } = props?.userSession;

  const topContainerText = !userId
    ? 'Receba avisos sobre todos os seus ativos favoritos!'
    : `Esteja atualizado com todas as informações de seus ativos!`;

  const middleContainerTitle = !userId
    ? `Crie sua conta` : `Fique por dentro!`;

  return (
    <>
      <section className="main-hero">

        <div className='inner-content max-w-6xl mx-auto'>

          <div className='top-container'>
            <h1 className="title">Simples e Prático</h1>
            <p>{topContainerText}</p>
          </div>

          <div className='middle-container'>
            <h3 className="title">{middleContainerTitle}</h3>

            {!userId && <div className='button-container'>
              <SignInGoogle />
              <a href={`${baseUrl}/signUp`} className="myButton">
                <span>Cadastre-se com seu e-mail</span>
              </a>
            </div>}
            
            {userId && <div className='button-container user-logged'>
              <a href={`${baseUrl}/user/assets`} className="myButton">
                <span>Acesse seus favoritos</span>
              </a>
              <a href={`${baseUrl}/user/alerts`} className="myButton">
                <span>Veja seus alertas</span>
              </a>
            </div>}

          </div>

        </div>

      </section>
    </>
  )
}
