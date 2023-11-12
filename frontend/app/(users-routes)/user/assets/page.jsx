import { nextAuthOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";

import { fetchUserAssets } from "app/api/assets/userAssets/fetchUserAssets";

import AssetFavButton from "components/AssetButtons/layout";
import { getAssetTypeDescription, formatCurrency } from "../../../helpers/assets";

import AssetDetails from "./components/AssetDetails";
import StockAssetDetails from "./components/StockAssetDetails";

export default async function UserAssets() {
  const session = await getServerSession(nextAuthOptions);

  // const { token } = session;
  const credentialSession = session?.user;

  const { id, name } =
    credentialSession ? credentialSession : session;

  const firstNAme = name.split(' ')?.[0];

  const userId = session?.userId ?? id;

  const fetchResults = await fetchUserAssets({ id: userId });
  const fetchResultsData = fetchResults.assetsList;

  return (
    <div className="w-full flex flex-col items-center justify-center p-10">

      <h3 className="mb-5">{firstNAme} - Lista de ativos</h3>

      {!fetchResultsData && <><p className="my-5 text-xl">Você não possui ativos favoritados</p></>}

      {fetchResultsData && fetchResultsData.map((result, key) => {
        const { id, type, name, assetDetails } = result;

        const isStockAsset = type == 2;

        const typeObj = getAssetTypeDescription(type);
        const nameDescription = typeObj?.nameDescription;
        const assetSlug = typeObj?.typeSlug;

        const symbolsData = JSON.parse(assetDetails?.symbols);

        if (isStockAsset) {
          console.log(symbolsData);
        }

        const currentPrice = formatCurrency(assetDetails?.currentPrice);

        const symbolProps = { id, name, symbolsData, nameDescription, assetSlug, currentPrice };

        return (
          <div key={key} className="mb-3 w-100 min-w-[300px] border-t-4" data-js="asset-container">

            <AssetFavButton assetId={id} userId={userId} />

            <Link rel="prefetch" href={`/asset/${assetSlug}/${name}`} className="block p-2 w-40 border border-gray-300 rounded-md mb-2">Ir até a página do ativo</Link>

            {!isStockAsset && <AssetDetails symbolProps={symbolProps} />}

            {isStockAsset && <StockAssetDetails symbolProps={symbolProps} />}

          </div>
        );

      })}

    </div>
  )
}