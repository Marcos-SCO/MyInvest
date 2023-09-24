import Link from "next/link";
import LoginButton from "@/components/LoginControls";
import LoginControls from "@/components/LoginControls";

import { getServerSession } from "next-auth";
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Navbar() {

  const session = await getServerSession(nextAuthOptions);

  return (
    <div className="p-4 flex justify-between item-center shadow-md">
      <Link className="font-bold text-lg text-green-700" href={'/'}>MyInvest</Link>

      <LoginControls session={session} />

    </div>
  );
}