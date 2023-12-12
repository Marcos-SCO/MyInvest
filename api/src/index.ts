// To ignore a types lib you can use: @ts-ignore

import App from './app';

import config from './config';

const { port } = config;

const app = App();
app.listen(port);

import { assetUpdatesCron } from './app/Queues/executeCrons';
import AssetsEmail from './app/Emails/AssetsEmail';
import TrendingTickersWebScrappy from './app/Assets/services/TrendingTickersWebScrappy';

// Define your cron job for 12 AM (midnight)
// assetUpdatesCron('0 0 * * *');

// Define your cron job for 12 PM (noon)
// assetUpdatesCron('0 12 * * *');
assetUpdatesCron('0 15 * * *');

// Define your cron job for 3 PM (noon)
// assetUpdatesCron('0 15 * * *');
assetUpdatesCron('0 18 * * *');

// Define your cron job for 6 PM (night)
// assetUpdatesCron('0 18 * * *');
assetUpdatesCron('0 21 * * *');

// assetUpdatesCron('*/2 * * * * *');

// assetUpdatesCron('*/15 * * * * *');

// assetUpdatesCron('*/30 * * * * *');

const assetsEmail = AssetsEmail.AssetsEmail()

const emailOptionsObj = {
  emailTo: 'malvitima0@gmail.com',
  subject: 'Hello warudo!!! Assunto pendente'
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





