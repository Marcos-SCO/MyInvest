import React from 'react'

export function MessageContainer() {
  return (
    <div className="form-message-container">
      <div className="form-message-inner">
        <h1 className="form-title moveFromBottom">Bem-Vindo(a) ao <br /> <span className="font-bold">MyInvest</span></h1>

        <div className="text-inner moveFromBottom">
          <p className="mb-5">Uma plataforma dedicada em facilitar sua vida!</p>
          <p>Monitore o preço de seus investimentos de forma simples e eficaz, receba notificações para se manter atualizado de seus ganhos e perdas!</p>
        </div>

      </div>
    </div>
  )
}
