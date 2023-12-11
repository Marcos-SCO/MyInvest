import { fetchUserAssets } from "../../api/assets/userAssets/fetchUserAssets";

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

  const sessionDataObj = {
    id,
    userId,
    email,
    name,
    firstName,
    image,
    token
  }

  return sessionDataObj;
}