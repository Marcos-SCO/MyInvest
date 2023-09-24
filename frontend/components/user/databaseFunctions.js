import { updateSession } from "./updateSession";

const API_BASE_URL = process.env.API_BASE_URL;

async function verifyIfEmailExists(userEmail) {

  const config = {
    // url: `${API_BASE_URL}/find-user/`,
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ email: userEmail }),
  };

  const res = await fetch(`${API_BASE_URL}/find-user/`, config);

  const user = await res.json();

  const emailWasFound = user?.emailFound;

  // console.log('Email founded? ', emailWasFound);

  if (!emailWasFound) return false;

  return true;
}

async function insertUserIfNotExists(user, accountType = 1) {
  // const userImage = session?.user?.image;
  const { name, email } = user;

  const emailAlreadyExists = await verifyIfEmailExists(email);

  // console.log('email exists', emailAlreadyExists);

  if (emailAlreadyExists) return;

  const splitName = name.split(' ');

  const firstName = splitName[0];
  const lastName = splitName.slice(1).join('');

  const userData = {
    firstName: firstName,
    lastName: lastName,
    email,
    accountType,
  };

  try {
    const res = await fetch(`${API_BASE_URL}/users/`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json', },
      body: JSON.stringify(userData),
    });

    console.log('User created:', res.json());

  } catch (error) {
    console.error('Error creating user:', error);
  }
}

async function loginUser(email, accountType) {
  const userData = {
    email: email,
    accountType: accountType,
  };

  const res = await fetch(`${API_BASE_URL}/auth/sign-in-provider`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(userData),
  });

  if (!res) {
    console.error('Error logging in user: ', res);
    return;
  }

  const loggedInUser = await res.json();

  const { token } = loggedInUser;
  // console.log('token: ', token);

  if (!token) return null;
  // console.log('User logged-in: ', loggedInUser);

  return token;

  // await updateSession(token);

}


export { verifyIfEmailExists, insertUserIfNotExists, loginUser }