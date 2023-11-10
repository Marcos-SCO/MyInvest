import Link from "next/link";
import LoginControls from "@/components/LoginControls";

import { getServerSession } from "next-auth";
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';

import Image from "next/image";
import {Logo} from "../public/logo.jpeg";

export default async function Navbar() {

  const session = await getServerSession(nextAuthOptions);

  return (
    <div className="pt-3 px-80 flex justify-between item-center z-5 bg-white">
      <div>
        <Link className="Logo-Link" href={'/'}>
          <Image src="/logo.jpeg" height={50} width={50} alt="Logo" className="Logo-Img"/>
        </Link>
      </div>

      <input type="text" placeholder="Search.." className="Search"></input>

      <div className="Login-Btn">
        <LoginControls session={session} />
      </div>

    </div>
  );
}