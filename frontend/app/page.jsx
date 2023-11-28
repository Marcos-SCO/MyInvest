import Link from "next/link";

import { nextAuthOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import ChangePageAttributes from "app/hooks/ChangePageAttributes";

import SearchModalButton from "../components/modal/SearchModalButton";
import SearchBar from "../components/searchBar/layout";

import MainHero from '../components/sections/MainHero';
import { getUserSessionData } from "./helpers/session/getUserSessionData";

export const metadata = {}

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);

  const userSession = await getUserSessionData(session);

  return (
    <>
      <ChangePageAttributes pageName="home" />
      <div>
        <MainHero userSession={userSession} />
      </div>
    </>
  );
}
