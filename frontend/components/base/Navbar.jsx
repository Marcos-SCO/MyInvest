import Link from "next/link";
import LoginControls from "components/auth/LoginControls";

import { getServerSession } from "next-auth";
import { nextAuthOptions } from 'app/api/auth/[...nextauth]/route';

export default async function Navbar() {

  const session = await getServerSession(nextAuthOptions);

  return (
    <div>
      <div className="flex justify-between item-center max-w-6xl mx-auto">
        <Link className="font-bold text-lg text-green-700" href={'/'}>MyInvest</Link>

        <LoginControls session={session} />

      </div>
    </div>
  );
}