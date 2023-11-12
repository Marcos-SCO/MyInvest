'use client';

import SignInGoogle from "components/SignInBtnGoogle";
import { signIn } from "next-auth/react";

import Link from "next/link";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { FormInput } from "components/Form/FormInput";


export default function SignInForm() {

  const [inputState, setInputState] = useState({
    email: '',
    password: ''
  });

  const inputs = [
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
      label: "Password",
      pattern: `^.{4,}$`,
      required: true,
    },
  ];

  const handleInput = (e) => setInputState({ ...inputState, [e.target.name]: e.target.value });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(inputState);

    const { email, password } = inputState;

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    if (result?.error) {
      console.error(result);
      window.alert('Credenciais inválidas');
      return;
    }

    router.replace('/admin');
  }

  return (
    <>
      <div className="form-container flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Acesse sua conta
          </h2>
        </div>

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
                className="sendButton flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                fazer Login
              </button>
            </div>
          </form>

          <div className="google-button-container mt-10 text-center text-sm text-gray-500">
            <SignInGoogle />
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Não possui uma conta?{' '}
            <Link href={'/signUp'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Cadastre agora!</Link>
          </p>

        </div>
      </div>
    </>
  )
}
