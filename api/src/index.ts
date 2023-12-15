// To ignore a types lib you can use: @ts-ignore

import App from './app';

import config from './config';

const { port, API_BASE_URL } = config;

const app = App();
app.listen(port);

import { assetUpdatesCron } from './app/Queues/executeCrons';
import AssetsEmail from './app/Emails/AssetsEmail';
// import TrendingTickersWebScrappy from './app/Assets/services/TrendingTickersWebScrappy';

// Define your cron job for 12 AM (midnight)
// assetUpdatesCron('0 0 * * *');

// Define your cron job for 10 AM
assetUpdatesCron('0 10 * * *');

// Define your cron job for 3 PM (noon)
assetUpdatesCron('0 15 * * *');

// Define your cron job for 6 PM (night)
assetUpdatesCron('0 18 * * *');

// assetUpdatesCron('*/2 * * * * *');

// assetUpdatesCron('*/15 * * * * *');

// assetUpdatesCron('*/30 * * * * *');

const assetsEmail = AssetsEmail.AssetsEmail()

const emailOptionsObj = {
  emailTo: 'marcosxsco@gmail.com',
  subject: 'Hello world!'
};

const emailTemplateVariables = {
  assetTicker: 'XPTO11',
  definedAlertPrice: '100.00',
  currentPrice: '110.00',
  lastOpenPrice: '96.00',
  lastClosedPrice: '95.00',
}

// assetsEmail.send(emailOptionsObj, emailTemplateVariables);

// TrendingTickersWebScrappy({ trendingType: 'acoes' });
// TrendingTickersWebScrappy({ trendingType: 'fiis', trendingSection: 'BAIXAS' });


const https = require('https');

function pingServer() {
  const url = 'https://my-invest-backend.onrender.com/';

  https.get(url, (res: any) => {
    const { statusCode } = res;

    const requestOk = statusCode === 200;
    console.log(statusCode);

    if (requestOk) {
      console.log(`Server pinged successfully at ${new Date()}`);
    }

    if (!requestOk) {
      console.error(`Failed to ping server. Status code: ${statusCode}`);
    }

  }).on('error', (err: any) => {
    console.error(`Error while pinging server: ${err.message}`);
  });
}

// Set up the interval to ping the server every 5 minutes (300,000 milliseconds)
const pingInterval = 5 * 60 * 1000; // 5 minutes in milliseconds
setInterval(pingServer, pingInterval);
