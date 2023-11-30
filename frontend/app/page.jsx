import Link from "next/link";

import { nextAuthOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getUserSessionData } from "./helpers/session/getUserSessionData";

import ChangePageAttributes from "app/hooks/ChangePageAttributes";

import SearchModalButton from "../components/modal/SearchModalButton";
import SearchBar from "../components/searchBar/layout";

import MainHero from '../components/sections/MainHero';

import TopAssets from '../components/topAssets/TopAssets';

export const metadata = {}

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);

  const userSession = await getUserSessionData(session);

  return (
    <>
      <ChangePageAttributes pageName="home" />
      <MainHero userSession={userSession} />
      <main>
        <TopAssets />
      </main>
    </>
  );
}
