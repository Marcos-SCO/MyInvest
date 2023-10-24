"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import DisplaySvg from "@/app/helpers/DisplaySvg";

export default function SignInBtnGoogle() {
  return (
    <button onClick={() => signIn('google')} className="flex items-center gap-4 shadow-xl rounded-lg pl-3">
      <DisplaySvg name="googleIcon"/>
      <span className="bg-custom-blue text-white px-4 py-3 rounded-md">Login com Google</span>
    </button>
  );
}