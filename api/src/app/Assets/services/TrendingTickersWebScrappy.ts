import { Request, Response } from "express";
import AuthError from "@/app/Auth/exceptions/AuthError";
import CommonError from "@/app/Auth/exceptions/CommonError";

import axios from 'axios';
import * as cheerio from 'cheerio';

const TrendingTickersWebScrappy = () => {

  async function getTrendingTickers(props: any) {

    const { trendingType, trendingSection = 'ALTAS' } = props;

    const trendingSectionValue =
      trendingSection.toUpperCase();

    const trendingTypeValue =
      trendingType.toLowerCase();

    const trendingUrl: any = {
      'acoes': 'https://statusinvest.com.br/Home/Today?categoryType=Acoes&indiceCode=ibovespa&yesterday=false&time=-1',

      'fiis': 'https://statusinvest.com.br/Home/Today?categoryType=FundosImobiliarios&indiceCode=&yesterday=false&time=-1',
    }

    const url = trendingUrl[trendingTypeValue];

    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'PostmanRuntime/7.33.0'
    };

    const axiosRequest = axios.get(url, { headers })
      .then(response => {
        const $ = cheerio.load(response.data);

        // Find the h3 element with the string "ALTAS"
        const h3Element = $(`h3:contains("${trendingSectionValue}")`);

        const foundSection = h3Element?.length > 0;

        if (!foundSection) {
          const notFoundSectionError =
            `H3 element with text "${trendingSectionValue}" not found.`;

          console.error(notFoundSectionError);

          throw new CommonError(notFoundSectionError);
        }

        // Find the parent div of the h3 element
        const parentDiv = h3Element.closest('div');

        // Find all div elements with class "listitem" under the same parent
        const listItems = parentDiv.find('[role="listitem"]');

        // Log the number of found list items for debugging
        // console.log('Number of list items:', listItems.length);

        let tickersObj: string[] = [];

        // Loop through the list items and extract the information
        listItems.each((index, item) => {
          // Log the entire HTML content of each list item for debugging
          // console.log(`HTML of list item ${index}:`, $(item).html());

          const tickerVolumeData = $(item).find('h4').text().trim();

          if (!tickerVolumeData) {
            console.error('Error: Ticker volume data not found');

            throw new CommonError("Ticker volume data not found");
          }

          const splitVolume = tickerVolumeData.split(' ');
          const ticker = splitVolume[0];

          // console.log(`TrendingTickersWebScrappy Ticker: ${ticker}`);

          tickersObj.push(ticker);

        });

        const jsonTickerObj = JSON.stringify(tickersObj);

        console.log(trendingType, trendingSection, jsonTickerObj);
        return jsonTickerObj;

      })
      .catch((error: any) => {
        console.error(`Failed to retrieve the webpage: \n${error?.message}`);

        throw new CommonError(error);
      });


    return axiosRequest;

  }

  return { getTrendingTickers };

}


export default TrendingTickersWebScrappy;