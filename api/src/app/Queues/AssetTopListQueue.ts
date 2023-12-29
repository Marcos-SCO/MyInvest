import TopAssetListModel from "../Assets/models/TopAssetListModel";
import TrendingTickersWebScrappy from "../Assets/services/TrendingTickersWebScrappy";

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function AssetTopListQueue() {

  async function getTopTickers() {

    const trendingSections = [
      { trendingType: "acoes", trendingSection: "altas" },
      { trendingType: "acoes", trendingSection: "baixas" },
      { trendingType: "fiis", trendingSection: "altas" },
      { trendingType: "fiis", trendingSection: "baixas" },
    ]

    const tickerAssetTypes: any = { 'acoes': 1, 'stocks': 2, 'fiis': 3, };
    const trendingTypes: any = { "altas": 'high', "baixas": 'low' };

    const insertedObjs: any = [];

    try {
      for (const trendingObjItem of trendingSections) {

        const trendingType = trendingObjItem?.trendingType;
        const trendingSectionType = trendingObjItem?.trendingSection;

        const tickerAssetType =
          tickerAssetTypes[trendingType] ?? false;

        const assetListTypeId =
          tickerAssetTypes[trendingType] ?? false;

        const trendingSection =
          trendingTypes[trendingSectionType] ?? false;
        // console.log('trending: ', trendingScrapItem);

        const trendingScrapItem: any =
          await TrendingTickersWebScrappy().getTrendingTickers(trendingObjItem);

        if (!trendingScrapItem || trendingScrapItem == '[]') {
          console.log('Not inserted: ', trendingObjItem, '\n');
          continue;
        }

        console.log(trendingObjItem);

        const insertTopItens =
          await TopAssetListModel().insertTopItens({
            tickers: trendingScrapItem,
            tickerAssetType,
            assetListTypeId,
            trendingSection,
          });

        // console.log('Insert top item: ', insertTopItens);
        insertedObjs.push(insertTopItens);
      }

      console.log('AssetTopListQueue get itens successfully.');
      return insertedObjs;

    } catch (error) {
      console.error('Error AssetTopListQueue get itens itens: ', error);

    } finally {
      await prisma.$disconnect();
    }
  }

  return { getTopTickers }

}

export default AssetTopListQueue;