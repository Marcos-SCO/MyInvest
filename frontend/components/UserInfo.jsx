'use client';

import Image from "next/image";
import SignInBtn from "./SignInBtn";
import { useSession } from 'next-auth/react';

export default function UserInfo() {
  const { status, data: session } = useSession();

  const isUserAuthenticated = status === 'authenticated';

  if (isUserAuthenticated) {
    const userImage = session?.user?.image;
    const userName = session?.user?.name;
    const userEmail = session?.user?.email;

    return (
      <section className="flex flex-col justify-center">
        <h1 className="text-center text-xl text-green-700">Usuário logado</h1>
        
        <figure className="flex flex-col sm:flex-row max-sm:items-center mt-10 p-8 shadow-xl rounded-lg">
          <Image className="rounded-full" src={userImage} width={60} height={60} loading="lazy" />
          <figcaption className="max-sm:pt-3 sm:pl-2 md:text-left">
            <p>
              <span>Nome: <b>{userName}</b></span><br />
              <span>E-mail: <b>{userEmail}</b></span>
            </p>
          </figcaption>
        </figure>

      </section>
    )
  }

  return <SignInBtn />;
}