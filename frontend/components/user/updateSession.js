import { getCsrfToken } from 'next-auth/react';

export const updateSession = async (newSession) => {
const nextAuthUrl = process.env.NEXTAUTH_URL;

  try {
    const res = await fetch(`${nextAuthUrl}/api/auth/session`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        csrfToken: await getCsrfToken(),
        data: newSession,
      }),
    });

    console.log(newSession);

  } catch (error) {
    console.log(error)
  }
  // const sessionResponse =  await res.json();

  // console.log('ress', sessionResponse);
}