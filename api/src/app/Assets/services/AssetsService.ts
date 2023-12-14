import AuthError from "@/app/Auth/exceptions/AuthError";
import CommonError from "@/app/Auth/exceptions/CommonError";
import { PrismaClient } from "@prisma/client";

import config from "@/config";

const axios = require('axios');

const prisma = new PrismaClient();

const AssetsService = () => {

  function getAssetTypeIdFromPathName(pathName: string) {
    const getTypeIdByPathName: any = { 'acoes': 1, 'stocks': 2, 'fiis': 3 };

    for (const key in getTypeIdByPathName) {
      if (!pathName.includes(key)) continue;

      return getTypeIdByPathName[key];
    }
    return null;
  }

  async function getAssetTypeIdByName(typeName: string) {
    const getTypeIdByPathName: any = { 'acoes': 1, 'stocks': 2, 'fiis': 3 };

    return getTypeIdByPathName[typeName] ?? false;
  }

  async function getAssetTypeNameById(typeId: number) {
    const assetTypes: any = { 1: 'ações', 2: 'stocks', 3: 'fiis', };

    return assetTypes[typeId] ?? false;
  }

  async function searchSymbol(ticker: String, type = 1) {

    const symbolEndpoint: any = {
      // 1: `https://mfinance.com.br/api/v1/stocks?symbols=${ticker}`,
      // 3: `https://mfinance.com.br/api/v1/fiis?symbols=${ticker}`,
      // 2: `https://api.nasdaq.com/api/quote/${ticker}/info?assetclass=stocks`,
      1: `https://statusinvest.com.br/home/mainsearchquery?q=${ticker}`,
      3: `https://statusinvest.com.br/home/mainsearchquery?q=${ticker}`,
      2: `https://statusinvest.com.br/home/mainsearchquery?q=${ticker}`,
    }

    if (!ticker) throw new CommonError(`No ticker was passed`);

    const symbolsApiUrl = symbolEndpoint[type];

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'PostmanRuntime/7.33.0'
    };

    const axiosRequest = axios.get(symbolsApiUrl, { headers })
      .then((response: any) => {
        // console.log('Response: ', response.data);

        return response?.data;
      })
      .catch((error: any) => {
        console.error(`Error: ${error?.message}`);

        throw new CommonError(error);
      })

    return axiosRequest;

  }

  async function getHistory(ticker: String, initialDate: string, finalDate: string, type = 1) {

    if (!ticker) throw new CommonError(`No ticker was passed`);
    if (!initialDate) throw new CommonError(`Initial date was passed`);
    if (!finalDate) throw new CommonError(`Final date was passed`);

    const symbolEndpoint: any = {
      1: `https://statusinvest.com.br/acao/getearnings`,
      3: `https://statusinvest.com.br/fii/getearnings`,
      2: `https://api.nasdaq.com/api/quote/${ticker}/chart?assetclass=stocks&fromdate=${initialDate}&todate=${finalDate}`,
    }

    const brazilianEndpoints = `${symbolEndpoint[type]}?IndiceCode=&Filter=${ticker}&Start=${initialDate}&End=${finalDate}`;

    const historyApiUrl = type == 2 ? symbolEndpoint[type] : brazilianEndpoints;

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'PostmanRuntime/7.33.0'
    };

    // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36

    const axiosRequest = axios.get(historyApiUrl, { headers })
      .then((response: any) => {
        // console.log('Response: ', response.data);

        return response?.data;
      })
      .catch((error: any) => {
        console.log(error);

        console.error(`Error in getHistory : ${error?.message}`);

        throw new CommonError(error);
      })

    return axiosRequest;

  }

  async function getHistoryFromBrapi(ticker: String) {
    // https://brapi.dev/docs/acoes

    if (!ticker) throw new CommonError(`No ticker was passed`);

    const apiKey = config?.BRAPI_API_KEY;
    if (!apiKey) throw new CommonError('No Brapi key');

    const symbolEndpoint = `https://brapi.dev/api/quote/${ticker}?range=3mo&interval=1d&token=${apiKey}`;

    const historyApiUrl = symbolEndpoint;

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'PostmanRuntime/7.33.0'
    };

    // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36

    const axiosRequest = axios.get(historyApiUrl, { headers })
      .then((response: any) => {
        // console.log('Response: ', response.data);

        return response?.data;
      })
      .catch((error: any) => {

        console.error(`Error in getHistoryFromBrapi : ${error?.message}`);

        throw new CommonError(error);
      });

    return axiosRequest;

  }

  return { searchSymbol, getHistory, getHistoryFromBrapi, getAssetTypeIdFromPathName, getAssetTypeNameById, getAssetTypeIdByName }
}

export default AssetsService;