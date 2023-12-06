"use client";

import { signIn } from "next-auth/react";
import DisplaySvg from "app/helpers/svg/DisplaySvg";

const baseUrl = process.env.FRONT_END_BASE_URL;

export default function SignInBtnGoogle() {

  const handleSignIn = async () => {
    // Trigger the sign-in process
    await signIn('google', { redirect: false });
  }

  return (
    <button onClick={handleSignIn} className="google-button flex justify-center items-center shadow-xl rounded-lg w100">
      <DisplaySvg name="googleIcon" />
      <span className="span-text">Login com Google</span>
    </button>
  );
}