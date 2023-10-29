import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import { fetchUserAssets } from "@/app/api/assets/userAssets/fetchUserAssets";

import AssetFavButton from "@/components/AssetButtons/layout";

export default async function UserAssets() {
  const session = await getServerSession(nextAuthOptions);

  // const { token } = session;
  const credentialSession = session?.user;

  const { id, name } =
    credentialSession ? credentialSession : session;

  const userId = session?.userId ?? id;

  const fetchResults = await fetchUserAssets({ id: userId });
  const fetchResultsData = fetchResults.assetsList;

  return (
    <div className="w-full flex flex-col items-center justify-center p-10">
      <h3 className="mb-5">Lista do usuário: {name}</h3>
      {fetchResultsData && fetchResultsData.map((result, key) => {
        const { id, type, name, assetDetails } = result;

        const symbolsData = JSON.parse(assetDetails?.symbols);
        const { closingPrice, dividendYield } = symbolsData;

        return (
          <div key={key} className="mb-3 w-100 min-w-[300px] border-t-4" data-js="asset-container">
            <AssetFavButton assetId={id} userId={userId} />

            <p>ID: {id}</p>
            <p>Nome: {name}</p>
            <p>Dividendo atual: {assetDetails.currentDividend}</p>
            <p>Preço de fechamento: {closingPrice}</p>
            <p>Dividend Yield: {dividendYield}</p>
          </div>
        );

      })}

    </div>
  )
}