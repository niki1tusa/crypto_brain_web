import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { ErrorComponent } from "../../../components/ErrorComponent";
import { Loader } from "../../../components/Loader";
import { Title } from "../../../components/Title";
import { useCrypto } from "../../../context";
import { EnhancedChartLine } from '../../../components/chartJS/EnhancedChartLine';

export const TradeOnlyCurrencyPage: React.FC = () => {
  const { isLoading, error, listing} = useCrypto();
  const { id } = useParams<{ id: string }>();
  const [priceChart, setPriceChart] = useState<number[]>([]);
  const [dateLabels, setDateLabels] = useState<string[]>([]);
  const [volumeData, setVolumeData] = useState<number[]>([]);
  const [chartReady, setChartReady] = useState(false);
  const volumeScale = 0.2
  // Convert id from string to number
  const numId = id ? parseInt(id, 10) : 0;
  
  // Find the specific cryptocurrency by id
  const result = listing?.find(item => item.id === numId);
  const generateRandomPriceData = (basePrice: number | undefined) => {
    if (!basePrice) return [];
    
    const randomTrend = (num: number) => {
      return Math.random() * ((num + num * 0.05) - (num - num * 0.05)) + (num - num * 0.05);
    };
    
    const prices: number[] = [];
    for (let i = 0; i < 24; i++) {
      prices.push(parseFloat(randomTrend(basePrice).toFixed(2)));
    }
    return prices;
  };

  const generateTimeLabels = () => {
    const labels: string[] = [];
    const now = new Date();
    
    for (let i = 23; i >= 0; i--) {
      const date = new Date(now);
      date.setHours(date.getHours() - i);
      date.setMinutes(0);
      date.setSeconds(0);
      labels.push(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
    
    return labels;
  };
  
  // Prepare volume data
  const generateVolumeData = (baseVolume: number | undefined) => {
    if (!baseVolume) return [];
    
    // Create an array of 24 volume values with some random variation
    const volumes: number[] = [];
    for (let i = 0; i < 24; i++) {
      // Random volume between 80% and 120% of the base volume
      const randomFactor = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
      volumes.push(Math.round(baseVolume * randomFactor / 24));
    }
    return volumes;
  };
  
  // Effect to generate chart data when component mounts or result changes
  useEffect(() => {
    if (result?.quote?.USD?.price) {
      const basePrice = result.quote.USD.price;
      const baseVolume = result.quote.USD.volume_24h;
      
      const prices = generateRandomPriceData(basePrice);
      const labels = generateTimeLabels();
      const volumes = generateVolumeData(baseVolume);
      
      setPriceChart(prices);
      setDateLabels(labels);
      setVolumeData(volumes);
      
      // Set chart as ready only when we have all the data
      if (prices.length > 0 && labels.length > 0) {
        setChartReady(true);
      }
    }
  }, [result]);
  if (isLoading) return <Loader />;
  if (error) return <ErrorComponent />;
  if (!result) return <div className="error-container">Cryptocurrency not found</div>;
  
  return (
    <div className="trade-currency-container">
      <Title heading="h2">Trade {result.name}</Title> 
      
      {chartReady ? (
        <EnhancedChartLine
          priceData={priceChart} 
          labels={dateLabels}
          title={`${result.name} Price History (24h)`}
          volumeData={volumeData}
          initialDarkMode={true}
          volumeScale={volumeScale}
        />
      ) : (
        <div className="chart-loading">
          Preparing chart data...
        </div>
      )}
 
    </div>
  );
}
