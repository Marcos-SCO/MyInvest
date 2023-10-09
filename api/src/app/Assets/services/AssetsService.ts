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
    .catch((error: any) =>  {
      console.error(`Error: ${error?.message}`);

      throw new CommonError(error);
    })

    return axiosRequest;
    
  }

  return { searchStockSymbol }
}

export default AssetsService;