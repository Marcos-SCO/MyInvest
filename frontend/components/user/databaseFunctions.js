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

  console.log('Email founded? ', emailWasFound);

  if (!emailWasFound) return false;

  return true;
}


async function insertUserCredentials(user, accountType = 1) {
  const { firstName, lastName, email, password, confirmPassword } = user;

  const isPasswordEqual = password == confirmPassword;

  if (!password || !isPasswordEqual) {
    console.error('Password is not equal');
    return { error: true };
  }

  if (email == '' || !email) {
    console.error('Without email');
    return { error: true };
  }

  const emailAlreadyExists = await verifyIfEmailExists(email);

  // console.log('email exists', emailAlreadyExists);
  if (emailAlreadyExists) {
    console.error('Usuário já cadastrado');
    return { alreadyUser: true };
  };

  const userData = {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    // accountType,
  };

  console.log(userData)

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

async function insertUserProvider(user, accountType = 1) {
  // const userImage = session?.user?.image;
  const { name, email } = user;

  const emailAlreadyExists = await verifyIfEmailExists(email);

  // console.log('email exists', emailAlreadyExists);
  if (emailAlreadyExists) return;

  const splitName = name?.split(' ');
  const firstName = splitName ? splitName[0] : '';

  const userData = {
    firstName: firstName,
    email,
    accountType,
  };

  if (splitName.length > 1) {
    const lastName = splitName.slice(1).join('');
    userData.lastName = lastName;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/users/`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json', },
      body: JSON.stringify(userData),
    });

    // console.log('User created:', res.json());
    console.log('User created');

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


export { verifyIfEmailExists, insertUserCredentials, insertUserProvider, loginUser }