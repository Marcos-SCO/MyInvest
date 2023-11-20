import Link from "next/link";

import { getServerSession } from "next-auth";
import { nextAuthOptions } from 'app/api/auth/[...nextauth]/route';

import LoginControls from "components/auth/LoginControls";
import DisplaySvg from 'app/helpers/svg/DisplaySvg';
import SearchModalButton from "../modal/SearchModalButton";

export default async function Navbar() {

  const session = await getServerSession(nextAuthOptions);

  return (
    <nav>
      <div className="flex justify-between item-center max-w-6xl mx-auto">
        <Link rel="prefetch" className="" href={'/'}>
          <DisplaySvg name="myInvestLogo" class="myInvestLogo m-auto" width="80" height="80" />
        </Link>

        <div className="search-bar-header-container">

          <SearchModalButton />

        </div>

        <LoginControls session={session} />

      </div>
    </nav>
  );
}