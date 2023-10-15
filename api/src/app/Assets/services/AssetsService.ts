import AuthError from "@/app/Auth/exceptions/AuthError";
import CommonError from "@/app/Auth/exceptions/CommonError";
import { PrismaClient } from "@prisma/client";

const axios = require('axios');

const prisma = new PrismaClient();

const AssetsService = () => {

  async function searchStockSymbol(ticker: String) {

    if (!ticker) throw new CommonError(`No ticker was passed`);

    const symbolsApiUrl = `https://mfinance.com.br/api/v1/stocks?symbols=${ticker}`;

    const axiosRequest = axios.get(symbolsApiUrl)
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

  async function getDividendHistory(ticker: String, initialDate: string, finalDate: string) {

    if (!ticker) throw new CommonError(`No ticker was passed`);
    if (!initialDate) throw new CommonError(`Initial date was passed`);
    if (!finalDate) throw new CommonError(`Final date was passed`);

    // `https://statusinvest.com.br/acao/getearnings?IndiceCode=&Filter=${ticker}&Start=2022-01-01&End=2024-01-01`

    const historyApiUrl = `https://statusinvest.com.br/acao/getearnings?IndiceCode=&Filter=${ticker}&Start=${initialDate}&End=${finalDate}`;

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

        console.error(`Error in getDividendHistory : ${error?.message}`);

        throw new CommonError(error);
      })

    return axiosRequest;

  }

  return { searchStockSymbol, getDividendHistory }
}

export default AssetsService;