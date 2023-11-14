'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { insertUserCredentials } from "app/helpers/user/databaseFunctions";

import { FormInput } from "components/Form/FormInput";


export default function SignUpForm() {

  const [inputState, setInputState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

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
      label: "Password",
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

    if (userError) return;

    if (alreadyUser) {
      const answer = window.confirm('Usuário já está cadastrado');
      return;
    }

    router.push('/signIn');
    return;
  }

  return (
    <>
      <div className="form-container mt-10 flex min-h-100 flex-1 flex-col justify-center px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Criei sua conta
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
              >Enviar</button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Já possui uma conta?{' '}
            <Link href={'/signIn'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Faça login agora!</Link>
          </p>

        </div>
      </div>
    </>
  )
}
