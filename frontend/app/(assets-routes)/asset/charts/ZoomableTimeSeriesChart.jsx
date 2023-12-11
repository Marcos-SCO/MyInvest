"use client";
import { useState, useEffect } from 'react';

import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ZoomableTimeSeriesChart = (props) => {
  const { objData, assetType = 1, assetTicker = false } = props;
  const tickerString =
    assetTicker ? assetTicker + ' - ' : '';
  /* {
    date: 1699621200,
    open: 10.81,
    high: 10.86,
    low: 10.8,
    close: 10.84,
    volume: 663743,
    adjustedClose: 10.84
  } */

  // console.log(assetType);

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // console.log("objData in useEffect:", objData);

    const objHasData = objData && objData.length > 0;
    if (!objHasData) return;

    const formattedData = objData.map(item => ({
      x: new Date(item.date * 1000),
      y: item.close,
    }));

    setChartData({
      series: [
        {
          name: 'Preço de fechamento',
          data: formattedData,
        },
      ],
      options: {
        chart: {
          type: 'line',
          zoom: {
            enabled: true,
          },
        },
        xaxis: {
          type: 'datetime',
        },
        stroke: {
          width: 2,
        },

        xaxis: {
          type: 'datetime',
          labels: {
            formatter: function (val) {
              const date = new Date(val);
              const day =
                date.toLocaleDateString('pt-BR', { day: '2-digit' });

              const month =
                date.toLocaleDateString('pt-BR', { month: 'short' });

              return `${day} ${month}`;
            },
          },
        },

        tooltip: {
          enabled: true,
          x: {
            formatter: function (val) {
              const date = new Date(val).toLocaleDateString('pt-BR');
              return `${tickerString}Data: ${date}`;
            }
          },
          y: {
            formatter: function (val, { series, seriesIndex, dataPointIndex, w }) {
              const dataItem = objData[dataPointIndex];
              const closePrice = dataItem.close;
              const toFixedValue = closePrice?.toFixed(2);
              const isBrazilianAsset = assetType == 1 || assetType == 3;

              const priceValue = isBrazilianAsset ? `R$ ${toFixedValue}` : `$${toFixedValue}`;

              // You can add additional labels here
              return `${priceValue}`;
            }
          },

          style: {
            fontSize: '1.12rem', // Adjust the font size as needed
          },

        },


      },
    });

  }, [objData]);

  return (
    <>
      {objData && chartData &&
        <div className='chart-container' id="historical-price-data">
          <ApexChart className="zoomableTimeSeriesChart"
            options={chartData.options}
            series={chartData.series}
            height={350}
            width={"100%"}
            type="line"
          />
        </div>
      }
    </>
  );
};

export { ZoomableTimeSeriesChart };