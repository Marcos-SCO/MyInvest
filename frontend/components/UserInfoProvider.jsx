import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import { insertUserIfNotExists, loginUser } from "./user/databaseFunctions";

// import { useSession } from 'next-auth/react';

import Image from "next/image";

export default async function UserInfoProvider() {
  const session = await getServerSession(nextAuthOptions);

  if (!session) return;

  insertUserIfNotExists(session, 2);

  const { image, name, email } = session;

  // loginUser(email, 2);
  // if (!session) { 
  //   loginUser(email, 2);
  // }

  console.log('my session: ', session);

  return (
    <>
      <h3 className="text-center text-xl text-green-700 mb-8">Login com Auth provider</h3>

      <figure className="flex flex-col sm:flex-row max-sm:items-center mb-10 p-8 shadow-xl rounded-lg">
        <Image className="rounded-full" src={image} width={60} height={60} loading="lazy" alt={name} />
        <figcaption className="max-sm:pt-3 sm:pl-2 md:text-left">
          <p>
            <span>Nome: <b>{name}</b></span><br />
            <span>E-mail: <b>{email}</b></span>
          </p>
        </figcaption>
      </figure>
    </>
  );

}