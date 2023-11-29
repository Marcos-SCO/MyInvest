const { PrismaClient } = require('@prisma/client');

import TopAssetListModel from '../../../../src/app/Assets/models/TopAssetListModel';

import TrendingTickersWebScrappy from '../../../../src/app/Assets/services/TrendingTickersWebScrappy';

const prisma = new PrismaClient();

async function assetTopListInserts() {

  const trendingSections = [
    { trendingType: "acoes", trendingSection: "altas" },
    { trendingType: "acoes", trendingSection: "baixas" },
    { trendingType: "fiis", trendingSection: "altas" },
    { trendingType: "fiis", trendingSection: "baixas" },
  ]

  const tickerAssetTypes = { 'acoes': 1, 'stocks': 2, 'fiis': 3, };
  const trendingTypes = { "altas": 'high', "baixas": 'low' };

  const insertedObjs: any = [];

  async function seed() {
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

        console.log(trendingObjItem);

        if (!trendingScrapItem) {
          continue;
        }

        const insertTopBrazilianStocks =
          await TopAssetListModel().insertTopItens({
            tickers: trendingScrapItem,
            tickerAssetType,
            assetListTypeId,
            trendingSection,
          });

        insertedObjs.push(insertTopBrazilianStocks);
      }

      console.log('assetTopListInserts successfully.');

      return insertedObjs;

    } catch (error) {
      console.error('Error assetTopListInserts itens: ', error);

    } finally {
      await prisma.$disconnect();
    }
  }

  seed()
    .catch(e => {
      console.error(e);
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = assetTopListInserts;
