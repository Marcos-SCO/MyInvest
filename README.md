# MyInvest

<p>Live demo: <a href="https://my-invest-frontend-marcos-sco.vercel.app">my-invest-frontend-marcos-sco.vercel.app</a></p>

## Project Overview 📈

MyInvest is a web application designed to help users monitor the prices of financial assets, such as stocks (Brazilian and US), and real estate funds (FIIs). The platform allows users to search for assets, view detailed information and price charts, set up price alerts, and manage a personalized watchlist.

The system leverages third-party APIs for real-time and historical financial data, and uses intelligent caching to optimize resource usage. Alerts are sent via email when user-defined price conditions are met.

<p align="left">
  <a href='https://my-invest-frontend-marcos-sco.vercel.app/' target="_blank">
    <img src="./frontend/public/img/mockups/myInvestMockup.jpg?raw=true" width="580" title="Main screen mockup">
  </a>
</p>

## Main Features 💻

- **Asset Search:**  
  Use the top search bar to find assets by name or ticker. Results display company name, current price, and percentage change (positive or negative).

  <p align="left">
    <a href='https://my-invest-frontend-marcos-sco.vercel.app/' target="_blank">
      <img src="./frontend/public/img/gif/searchBar.gif?raw=true" width="580" title="Top search bar">
    </a>
  </p>

- **Asset Details:**  
  View detailed charts showing the price history of an asset over the last 3 months.

  <p align="left">
    <a href='https://my-invest-frontend-marcos-sco.vercel.app/' target="_blank">
      <img src="./frontend/public/img/gif/graph.gif?raw=true" width="580" title="Asset Graph">
    </a>
  </p>

- **Price Alerts:**  
  Set up alerts for specific price thresholds. When the asset reaches the defined value, you receive an email notification.

  <p align="left">
    <a href='https://my-invest-frontend-marcos-sco.vercel.app/' target="_blank">
      <img src="./frontend/public/img/gif/alerts.gif?raw=true" width="580" title="Alerts definition">
    </a>
  </p>

- **Watchlist:**  
  Follow assets by clicking the "follow" button on each asset card. Followed assets appear in the "My Assets" page. Unfollow assets at any time via a confirmation modal.

  <p align="left">
    <a href='https://my-invest-frontend-marcos-sco.vercel.app/' target="_blank">
      <img src="./frontend/public/img/gif/assetList.gif?raw=true" width="580" title="Asset list">
    </a>
  </p>

- **Alert Management:**  
  Alerts are displayed in a dedicated section, showing the asset, the set value, and whether the alert is for "greater than" or "less than" the specified price.

- **Authentication:**  
  Sign in using Google or traditional email and password.

  <p align="left">
    <a href='https://my-invest-frontend-marcos-sco.vercel.app/' target="_blank">
      <img src="./frontend/public/img/gif/login.gif?raw=true" width="580" title="Login">
    </a>
  </p>

- **Market Highlights:**  
  The homepage features sliders with the top-performing and worst-performing stocks and FIIs during the trading session.

  <p align="left">
    <a href='https://my-invest-frontend-marcos-sco.vercel.app/' target="_blank">
      <img src="./frontend/public/img/gif/initialPage.gif?raw=true" width="580" title="Initial page">
    </a>
  </p>

## Technologies Used 🚀

- JavaScript
- TypeScript
- MySQL
- Next.js

## Cronjob & Data Management ⏲

Due to the use of free APIs with limitations, the system implements smart caching and periodic updates:

- When a user searches for an asset not yet in the database, it is fetched from an external API and stored for future use.
- Periodically, during market hours, a cron job updates all asset prices and triggers email alerts for assets that meet user-defined conditions.

  <p align="left">
    <a href='https://my-invest-frontend-marcos-sco.vercel.app/' target="_blank">
      <img src="./frontend/public/img/gif/cronjob.gif?raw=true" width="580" title="cronjob">
    </a>
  </p>

## Summary

MyInvest provides an intuitive platform for tracking financial assets, setting up price alerts, and managing a personalized portfolio, making it easier for users to stay informed about market movements and their investments.