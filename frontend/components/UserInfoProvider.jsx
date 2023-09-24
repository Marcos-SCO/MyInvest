'use client';

import Image from "next/image";
import { useSession } from 'next-auth/react';

import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;

async function verifyIfEmailExists(userEmail) {

  const config = {
    method: 'post',
    url: `${API_BASE_URL}/find-user/`,
    data: { email: userEmail },
    headers: {
      'Content-Type': 'application/json'
    }
  };

  console.log(API_BASE_URL);

  return axios(config)
    .then(response => {
      // console.log('Email ', response.data);
      return true;
    })
    .catch(error => {
      // console.error('Error getting email', error);
      return false;
    });
}

async function insertUserIfNotExists(user) {
  // const userImage = session?.user?.image;
  const { name, email } = user;

  const emailAlreadyExists = await verifyIfEmailExists(email);

  if (emailAlreadyExists) return;

  const splitName = name.split(' ');

  const firstName = splitName[0];
  const lastName = splitName.slice(1).join();

  const userData = {
    firstName: firstName,
    lastName: lastName,
    email,
    accountType: 2,
  };

  axios.post(`${API_BASE_URL}/users/`, userData)
    .then(response => {
      console.log('User created:', response.data);
    })
    .catch(error => {
      console.error('Error creating user:', error);
    });

}


async function loginUser(email, accountType) {
  const userData = {
    email: email,
    accountType: accountType,
  };

  const config = {
    method: 'post',
    url: `${API_BASE_URL}/auth/sign-in-provider`,
    data: userData,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await axios(config);
    console.log('User logged in:', response.data);
    // Perform further actions after successful login
  } catch (error) {
    console.error('Error logging in user:', error);
  }
}


export default function UserInfoProvider() {
  const { status, data: session } = useSession();

  // console.log('status', status);

  const isUserAuthenticated = status === 'authenticated';

  if (isUserAuthenticated) {

    insertUserIfNotExists(session);

    const userImage = session?.image;
    const userName = session?.name;
    const userEmail = session?.email;

    loginUser(userEmail, 2);

    return (
      <section className="flex flex-col justify-center">
        <h1 className="text-center text-xl text-green-700">Usuário logado</h1>

        <figure className="flex flex-col sm:flex-row max-sm:items-center mt-10 p-8 shadow-xl rounded-lg">
          <Image className="rounded-full" src={userImage} width={60} height={60} loading="lazy" alt={userName} />
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
}