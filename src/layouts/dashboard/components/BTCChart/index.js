import React, { useState, useEffect } from "react";
import { Card } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import LineChart from "examples/Charts/LineCharts/LineChart";
import colors from "assets/theme/base/colors";

const BTCChart = () => {
  const { gradients } = colors;
  const [btcData, setBtcData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch BTC price data from CoinGecko API (free, no API key needed)
    const fetchBTCData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily'
        );
        const data = await response.json();

        if (data && data.prices) {
          const prices = data.prices.map(([timestamp, price]) => Math.round(price));
          const dates = data.prices.map(([timestamp]) => {
            const date = new Date(timestamp);
            return `${date.getMonth() + 1}/${date.getDate()}`;
          });

          setBtcData({
            prices,
            dates,
            currentPrice: prices[prices.length - 1],
            change: ((prices[prices.length - 1] - prices[0]) / prices[0] * 100).toFixed(2)
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching BTC data:', error);
        setLoading(false);
      }
    };

    fetchBTCData();
    // Actualizar cada 5 minutos
    const interval = setInterval(fetchBTCData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const chartData = btcData ? [
    {
      name: "BTC Price",
      data: btcData.prices,
    },
  ] : [];

  const chartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: btcData?.dates || [],
      labels: {
        style: {
          colors: "#c8cfca",
          fontSize: "10px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#c8cfca",
          fontSize: "10px",
        },
        formatter: function (value) {
          return "$" + value.toLocaleString();
        },
      },
    },
    legend: {
      show: false,
    },
    grid: {
      strokeDashArray: 5,
      borderColor: "#56577A",
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [],
      },
      colors: ["#0075FF"],
    },
    colors: ["#0075FF"],
  };

  return (
    <Card sx={{ height: "340px", p: "24px" }}>
      <VuiBox height="100%" display="flex" flexDirection="column">
        <VuiBox mb={2}>
          <VuiTypography color="white" variant="lg" fontWeight="bold" mb="4px">
            Bitcoin (BTC)
          </VuiTypography>
          {!loading && btcData && (
            <>
              <VuiTypography color="white" variant="h3" fontWeight="bold" mb="8px">
                ${btcData.currentPrice.toLocaleString()}
              </VuiTypography>
              <VuiTypography
                color={btcData.change >= 0 ? "success" : "error"}
                variant="button"
                fontWeight="bold"
              >
                {btcData.change >= 0 ? '+' : ''}{btcData.change}% (7 días)
              </VuiTypography>
            </>
          )}
          {loading && (
            <VuiTypography color="text" variant="button">
              Cargando datos...
            </VuiTypography>
          )}
        </VuiBox>
        <VuiBox flex={1} minHeight={0}>
          {!loading && btcData && (
            <LineChart
              lineChartData={chartData}
              lineChartOptions={chartOptions}
            />
          )}
        </VuiBox>
      </VuiBox>
    </Card>
  );
};

export default BTCChart;
