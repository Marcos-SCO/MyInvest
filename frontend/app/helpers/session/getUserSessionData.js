export async function getUserSessionData(session) {

  const credentialSession = session?.user;

  const sessionData =
    credentialSession ? credentialSession : session;

  const id = sessionData?.id;
  const name = sessionData?.name;

  const firstName = name?.split(' ')?.[0];

  const userId = session?.userId ?? id;

  const token = session?.token ?? false;

  return {
    id,
    userId,
    name,
    firstName,
    token
  }
}