import Link from "next/link";

import { getServerSession } from "next-auth";
import { nextAuthOptions } from 'app/api/auth/[...nextauth]/route';
import { getUserSessionData } from "../../app/helpers/session/getUserSessionData";

import LoginControls from "components/auth/LoginControls";
import DisplaySvg from 'app/helpers/svg/DisplaySvg';
import SearchModalButton from "../modal/SearchModalButton";

import MenuDrop from "components/base/MenuDrop";

export default async function Navbar() {

  const session = await getServerSession(nextAuthOptions);

  const userSessionData = await getUserSessionData(session);

  return (
    <nav className="nav-bar-container">
      <div className="flex justify-between item-center max-w-6xl mx-auto">
        <Link rel="prefetch" className="" href={'/'}>
          <DisplaySvg name="myInvestLogo" class="myInvestLogo m-auto" width="80" height="80" />
        </Link>

        <div className="flex align-center">

          <div className="search-bar-header-container">
            <SearchModalButton />
          </div>

          <MenuDrop userSessionData={userSessionData} />

          {/* <LoginControls session={session} /> */}
        </div>

      </div>
    </nav>
  );
}