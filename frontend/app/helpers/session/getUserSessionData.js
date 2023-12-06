export async function getUserSessionData(session) {

  const credentialSession = session?.user;

  const sessionData =
    credentialSession ? credentialSession : session;

  const id = sessionData?.id;

  const name = credentialSession
    ? credentialSession?.fullName
    : sessionData?.name;

  const email = sessionData?.email ?? false;

  const firstName = name?.split(' ')?.[0];

  const userId = session?.userId ?? id;

  const token = session?.token ?? false;

  const image = sessionData?.image ?? false;

  return {
    id,
    userId,
    email,
    name,
    firstName,
    image,
    token
  }
}