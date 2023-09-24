import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function privateLayout({ children }) {
  const session = await getServerSession(nextAuthOptions);
  
  console.log('Session: ', session);

  if (!session) redirect('/');

  return <>{children}</>
}