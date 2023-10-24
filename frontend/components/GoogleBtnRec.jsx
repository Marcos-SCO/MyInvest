"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import DisplaySvg from "@/app/helpers/DisplaySvg";
import {GLogo} from '../public/Google-logo.png'

export default function SignInBtnGoogle() {
  return (
    <button onClick={() => signIn('google')} className="G-BtnRec">
      <Image src='/Google-logo.png' alt="Logo-Google" width={50} height={50} className="logo-g-rec"/>
      
      <h1 className="g-h1">Fazer Login com Google</h1>

    </button>
  );
}