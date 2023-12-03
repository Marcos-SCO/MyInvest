'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { insertUserCredentials } from "app/helpers/user/databaseFunctions";

import { FormInput } from "components/form/FormInput";

import { MessageContainer } from "./MessageContainer";

import DisplaySvg from 'app/helpers/svg/DisplaySvg';

import { toast } from 'react-toastify';

const baseUrl = process.env.FRONT_END_BASE_URL;

export default function SignUpForm() {

  const [inputState, setInputState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    formFeedBackError: false,
  });

  const formFeedBackError = inputState?.formFeedBackError;

  const inputs = [
    {
      name: "firstName",
      type: "text",
      placeholder: "Nome",
      errorMessage:
        "Mínimo de 3 caracteres",
      label: "Nome",
      pattern: "^.{3,}$",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "Sobrenome",
      errorMessage:
        "Mínimo de 3 caracteres",
      label: "Sobrenome",
      pattern: "^.{3,}$",
      required: true,
    },
    {
      name: "email",
      type: "email",
      placeholder: "E-mail",
      errorMessage: "Precisa ser um e-mail válido!",
      label: "Email",
      required: true,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Senha",
      errorMessage:
        "Mínimo de 4 caracteres é necessário",
      label: "Senha",
      pattern: `^.{4,}$`,
      required: true,
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirmar senha",
      errorMessage: "As senhas não são iguais!",
      label: "Confirme sua senha",
      pattern: inputState.password,
      required: true,
    },
  ];

  const handleInput = (e) => setInputState({ ...inputState, [e.target.name]: e.target.value });

  const router = useRouter();

  // console.log(inputState)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, confirmPassword } = inputState;

    console.log(inputState)

    const userInsert = await insertUserCredentials(inputState);

    const userError = userInsert?.error;
    const alreadyUser = userInsert?.alreadyUser;

    setInputState({ ...inputState, formFeedBackError: false });

    // if (userError) return;

    if (alreadyUser) {
      const alreadyUserMessage = 'Usuário já está cadastrado!';

      toast.error(alreadyUserMessage);

      setInputState({ ...inputState, formFeedBackError: alreadyUserMessage });

      return;
    }

    toast.success('Usuário cadastrado com sucesso!');

    router.push('/signIn');
    return;
  }

  return (
    <>
      <section className="form-section-container flex flex-wrap md:flex-no-wrap">

        <MessageContainer />

        <div className="form-container flex flex-1 flex-col justify-center py-12">

          <div className="form-container-header sm:mx-auto sm:w-full sm:max-w-sm">

            <a href={`${baseUrl}`} title="MyInvest">
              <DisplaySvg name="myInvestLogo" class="myInvestLogo m-auto" width="120" height="120" />
            </a>

          </div>


          <div className="form-container-inner moveFromBottom">
            <h2 className="form-header-title text-center">
              Criei sua conta
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
                  >Enviar</button>
                </div>

                {formFeedBackError && <div className="form-feed-back" data-js="form-feed-back">
                  <p>{formFeedBackError}</p>
                </div>}

              </form>

              <p className="account-question">
                Já possui uma conta?{' '}
                <Link rel="prefetch" href={'/signIn'} className="font-semibold leading-6">Faça login agora!</Link>
              </p>

            </div>
          </div>

        </div>
      </section>
    </>
  )
}
