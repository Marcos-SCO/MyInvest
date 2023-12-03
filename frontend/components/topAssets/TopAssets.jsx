import { nextAuthOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import Link from "next/link";

// import TopAssetsList from './TopAssetsList';
import { getUserSessionData } from "app/helpers/session/getUserSessionData";

import DisplaySvg from "../../app/helpers/svg/DisplaySvg";

import fetchTopListAssets from '../../app/api/assets/fetchTopListAssets';
import { formatCurrency, getAssetTypeDescription } from "../../app/helpers/assets";

import DisplaySectionElements from './DisplaySectionElements';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function getDetailListElements(dataElements = false) {
  if (!dataElements) return false;

  return dataElements.map((item) => ({
    name: item?.name,
    type: item?.type,
    ...item?.AssetDetailList?.[0]
  }));
}

async function getTopListObjData(assetsType) {
  const topAssetFetch = await fetchTopListAssets(assetsType);
  if (!topAssetFetch) return false;

  const topAssetsData = topAssetFetch?.topAssets;
  if (!topAssetsData) return false;

  const highItensData = topAssetsData?.highItensData;
  const lowItensData = topAssetsData?.lowItensData;

  const heighDetailListElements =
    getDetailListElements(highItensData) ?? [];

  const lowDetailListElements =
    getDetailListElements(lowItensData) ?? [];

  return {
    heighDetailListElements,
    lowDetailListElements,
  }
}

function getAssetProperties(assetsData) {
  if (!assetsData) return;

  const baseUrl = process.env.NEXT_PUBLIC_FRONT_END_URL;

  const type = assetsData?.type;
  const name = assetsData?.name;
  const assetId = assetsData?.assetId;

  const typeObj = getAssetTypeDescription(type);
  const nameDescription = typeObj?.nameDescription;
  const assetSlug = typeObj?.typeSlug;

  const createdAt = assetsData?.createdAt;
  const updatedAt = assetsData?.updatedAt;

  const updatedAtString = updatedAt ?
    new Date(updatedAt).toLocaleDateString('pt-BR') : false;

  const symbols = assetsData?.symbols
    ? JSON.parse(assetsData?.symbols) : undefined;

  const assetLongName =
    symbols?.name ?? symbols?.companyName;

  const assetLogoUrl = assetsData?.assetIcon
    ?? 'https://brapi.dev/favicon.svg';

  const currentPrice =
    formatCurrency(assetsData?.currentPrice);

  const assetUrl = `${baseUrl}/asset/${assetSlug}/${name}`;

  return {
    assetUrl,
    assetId,
    ticker: name,
    assetUrl,
    nameDescription,
    assetLongName,
    assetLogoUrl,
    currentPrice,
    updatedAtString,
    symbols,
  }
}

function getSectionElements(sectionData) {
  if (!sectionData) return;

  const highData = sectionData?.heighDetailListElements;
  const lowData = sectionData?.lowDetailListElements;

  const highElements = highData
    ? highData.map(item => getAssetProperties(item)) : [];

  const lowElements = lowData
    ? lowData.map(item => getAssetProperties(item)) : [];

  return { highElements, lowElements }
}

export default async function TopAssets({ ...props }) {
  const session = await getServerSession(nextAuthOptions);
  const sessionData = await getUserSessionData(session);
  const { id, userId, name, firstName, token } = sessionData;

  const baseUrl = process.env.NEXT_PUBLIC_FRONT_END_URL;

  const brazilianStocksData = await getTopListObjData(1);
  const fiisData = await getTopListObjData(3);

  const brazilianStocksSectionElements =
    getSectionElements(brazilianStocksData);

  const highBrazilianSectionElements =
    brazilianStocksSectionElements?.highElements;
  const lowBrazilianSectionElements =
    brazilianStocksSectionElements?.lowElements;

  const fiisSectionElements = getSectionElements(fiisData);

  const highFiisSectionElements = fiisSectionElements?.highElements;
  const lowFiisSectionElements = fiisSectionElements?.lowElements;

  return (
    <article className="topAssetsSection user-assets py-10" data-js="top-list-section">

      {highBrazilianSectionElements?.length > 0 &&
        <section className="sliderContainer">
          <h2 className="sectionTitle">Ações Top Alta</h2>
          <DisplaySectionElements elementsSectionData={highBrazilianSectionElements} userId={userId} key="brazilianStocks-top-high" />
        </section>}

      {lowBrazilianSectionElements?.length > 0 &&
        <section className="sliderContainer animationContainer hide">
          <h2 className="sectionTitle">Ações Top Queda</h2>
          <DisplaySectionElements elementsSectionData={lowBrazilianSectionElements} userId={userId} key="brazilianStocks-top-low" />
        </section>}

      {highFiisSectionElements?.length > 0 &&
        <section className="sliderContainer animationContainer hide">
          <h2 className="sectionTitle">Fiis Top Alta</h2>
          <DisplaySectionElements elementsSectionData={highFiisSectionElements} userId={userId} key="fiis-top-high" />
        </section>}

      {lowFiisSectionElements?.length > 0 &&
        <section className="sliderContainer animationContainer hide">
          <h2 className="sectionTitle">Fiis Top Queda</h2>
          <DisplaySectionElements elementsSectionData={lowFiisSectionElements} userId={userId} key="fiis-top-low" />
        </section>}

    </article>
  )
}