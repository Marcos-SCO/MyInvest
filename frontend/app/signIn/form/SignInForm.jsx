'use client';

import SignInGoogle from "components/SignInBtnGoogle";
import { signIn } from "next-auth/react";

import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { FormInput } from "components/Form/FormInput";

import DisplaySvg from 'app/helpers/svg/DisplaySvg';

const baseUrl = process.env.FRONT_END_BASE_URL;

export default function SignInForm() {

  const [inputState, setInputState] = useState({
    email: '',
    password: '',
    formFeedBackError: false,
  });

  const formFeedBackError = inputState?.formFeedBackError;

  const inputs = [
    {
      name: "email",
      type: "email",
      placeholder: "E-mail",
      errorMessage: "Precisa ser um e-mail válido!",
      label: "E-mail",
      required: true,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Senha",
      errorMessage:
        "Preencha este campo",
      label: "Senha",
      required: true,
    },
  ];

  const handleInput = (e) => setInputState({ ...inputState, [e.target.name]: e.target.value });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(inputState);

    const { email, password } = inputState;

    setInputState({ ...inputState, formFeedBackError: false });

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    if (result?.error) {
      console.error(result);
      // window.alert('Credenciais inválidas');

      setInputState({ ...inputState, formFeedBackError: 'E-mail ou senha inválidos!' });

      return;
    }

    router.replace('/admin');
  }

  return (
    <>
      <section className="form-section-container flex flex-wrap md:flex-no-wrap">

        <div className="form-message-container">
          <div className="form-message-inner">
            <h1 className="form-title moveFromBottom">Bem-Vindo(a) ao <br /> <span className="font-bold">MyInvest</span></h1>

            <div className="text-inner moveFromBottom">
              <p className="mb-5">Uma plataforma dedicada em facilitar sua vida!</p>
              <p>Monitore o preço de seus investimentos de forma simples e eficaz, receba notificações para se manter atualizado de seus ganhos e perdas!</p>
            </div>

          </div>
        </div>

        <div className="form-container flex flex-1 flex-col justify-center py-12">

          <div className="form-container-header sm:mx-auto sm:w-full sm:max-w-sm moveFromLeft-mobile">

            <a href={`${baseUrl}`} title="MyInvest">
              <DisplaySvg name="myInvestLogo" class="myInvestLogo m-auto" width="120" height="120" />
            </a>

          </div>

          <div className="form-container-inner">

            <h2 className="form-header-title text-center">
              Acesse sua conta
            </h2>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>

                {inputs.map((input, key) => (
                  <FormInput
                    key={key}
                    {...input}
                    value={inputState[input.name]}
                    handleInput={handleInput}
                  />
                ))}

                <div>
                  <button
                    type="submit"
                    className="form-button sendButton"
                  >Fazer Login</button>
                </div>

                {formFeedBackError && <div className="form-feed-back" data-js="form-feed-back">
                  <p>{formFeedBackError}</p>
                </div>}

              </form>

              <div className="google-button-container text-center">
                <p>Ou utilize o Google para login:</p>
                <SignInGoogle />
              </div>

              <p className="account-question">
                Não possui uma conta?{' '}
                <Link href={'/signUp'} className="font-semibold leading-6">Cadastre agora!</Link>
              </p>

            </div>
          </div>

        </div>
      </section>
    </>
  )
}
