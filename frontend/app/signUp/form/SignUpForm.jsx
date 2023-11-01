'use client';

import { insertUserCredentials } from "components/user/databaseFunctions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpForm() {

  const [inputState, setInputState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInput = (e) => setInputState({ ...inputState, [e.target.name]: e.target.value });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(inputState);

    const { firstName, lastName, email, password, confirmPassword } = inputState;

    // console.log(inputState);

    const userInsert = await insertUserCredentials(inputState);

    const userError = userInsert?.error;
    const alreadyUser = userInsert?.alreadyUser;

    if (userError) return;

    if (alreadyUser) {
      const answer = window.confirm('Usuário já está cadastrado');
      if (!answer) return;

      router.push('/signIn');
      return;
    }

    router.push('/signIn');
    return;
  }

  return (
    <>
      <div className="mt-10 flex min-h-100 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                Seu nome
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  // type="email"
                  autoComplete="Nome"
                  // required
                  onChange={(e) => handleInput(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                Sobrenome
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  // type="email"
                  autoComplete="Sobrenome"
                  // required
                  onChange={(e) => handleInput(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Endereço de E-mail
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  // type="email"
                  autoComplete="E-mail"
                  // required
                  onChange={(e) => handleInput(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Senha
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="Senha atual"
                  // required
                  onChange={(e) => handleInput(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirmar senha
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="Senha atual"
                  // required
                  onChange={(e) => handleInput(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
