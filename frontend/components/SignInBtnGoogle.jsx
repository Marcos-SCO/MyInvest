"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import DisplaySvg from "app/helpers/svg/DisplaySvg";

export default function SignInBtnGoogle() {
  return (
    <button onClick={() => signIn('google')} className="google-button flex justify-center items-center shadow-xl rounded-lg w100">
      <DisplaySvg name="googleIcon"/>
      <span className="span-text">Login com Google</span>
    </button>
  );
}