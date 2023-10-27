import { getServerSession } from "next-auth"
import { nextAuthOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";

export default async function UserAssets({ children }) {
  const session = await getServerSession(nextAuthOptions)

  if (!session) redirect('/signIn');

  return (
    <>{children}</>
  )
}
