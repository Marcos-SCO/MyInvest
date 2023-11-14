export async function getUserSessionData(session) {
  const credentialSession = session?.user;

  const { id, name } =
    credentialSession ? credentialSession : session;

  const firstName = name.split(' ')?.[0];

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