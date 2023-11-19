import Link from "next/link";

import { getServerSession } from "next-auth";
import { nextAuthOptions } from 'app/api/auth/[...nextauth]/route';

import LoginControls from "components/auth/LoginControls";
import DisplaySvg from 'app/helpers/svg/DisplaySvg';

export default async function Navbar() {

  const session = await getServerSession(nextAuthOptions);

  return (
    <nav>
      <div className="flex justify-between item-center max-w-6xl mx-auto">
        <Link rel="prefetch" className="" href={'/'}>
          <DisplaySvg name="myInvestLogo" class="myInvestLogo m-auto" width="80" height="80" />
        </Link>

        <div className="search-bar-header-container">

          <button class="search-button" data-micromodal-trigger="modal-1">

            <div className="button-inner-label">
              <DisplaySvg name="magnifyingGlass" width="23" height="23" />
              <label>Procurar ativos...</label>
            </div>

            <kbd>/</kbd>
          </button>

        </div>

        <LoginControls session={session} />

      </div>
    </nav>
  );
}