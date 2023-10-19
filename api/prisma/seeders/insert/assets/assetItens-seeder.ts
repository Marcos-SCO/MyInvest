const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

import AssetNasdaq from "../../../../src/app/Assets/models/AssetNasdaq";
import AssetModel from "../../../../src/app/Assets/models/AssetModel";

// const AssetNasdaq =
//   require("../../../../src/app/Assets/models/AssetNasdaq.ts");

// const AssetModel =
//   require("../../../../src/app/Assets/models/AssetModel.ts");

const brazilStockTickers =
  ['PETR4', 'VALE3', 'BBDC4', 'ITUB4', 'ABEV3'];

const usStockTickers = ['AAPL', 'AMZN', 'MSFT', 'GOOGL', 'META'];

const fiiTickers = ['HGLG11', 'MXRF11', 'HGRE11', 'ALZR11', 'JSRE11'];

async function assetSeeds() {

  async function seedAsset(ticker, type) {

    const alreadyInserted = await AssetModel().getAssetByTickerFromDb(ticker);

    if (alreadyInserted) {
      console.log(`${ticker} already inserted...`);
      return;
    }

    const insertObj = { ticker, type };

    const isNasdaq = type == 2;

    isNasdaq ?
      await AssetNasdaq().insertAsset(insertObj) :
      await AssetModel().insertAsset(insertObj);
  }

  async function seedAssets() {
    // Seed Brazilian stocks (type 1)
    await Promise.all(brazilStockTickers.map((ticker) => seedAsset(ticker, 1)));

    // Seed American stocks (type 2)
    await Promise.all(usStockTickers.map((ticker) => seedAsset(ticker, 2)));

    // Seed Real Estate Investment Funds (FIIs) (type 3)
    await Promise.all(fiiTickers.map((ticker) => seedAsset(ticker, 3)));
  }

  seedAssets()
    .catch((error) => {
      console.error('Error seeding Asset Itens:', error);
    })
    .finally(async () => {
      await prisma.$disconnect();

      console.log(`\nFinish inserting assets\n`);
    });

}

module.exports = assetSeeds;