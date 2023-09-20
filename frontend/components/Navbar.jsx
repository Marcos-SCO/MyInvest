import Link from "next/link";
import LoginButton from "@/components/LoginButton";

export default function Navbar() {

  return (
    <div className="p-4 flex justify-between item-center shadow-md">
      <Link className="font-bold text-lg text-green-700" href={'/'}>MyInvest</Link>

      <LoginButton />

    </div>
  );
}