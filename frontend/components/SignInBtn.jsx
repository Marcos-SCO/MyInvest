"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import DisplaySvg from "@/app/helpers/DisplaySvg";

export default function SignInBtn() {
  return (
    <button onClick={() => signIn('google')} className="flex items-center gap-4 shadow-xl rounded-lg pl-3">
      {/* <Image src={'/google-logo.svg'} height={30} width={30} /> */}
      <DisplaySvg name="googleIcon" height={30} width={30} />
      <span className="bg-blue-500 text-white px-4 py-3">Login com Google</span>
    </button>
  );
}