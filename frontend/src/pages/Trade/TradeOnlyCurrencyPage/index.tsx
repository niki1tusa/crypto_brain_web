import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { ErrorComponent } from "../../../components/ErrorComponent";
import { Loader } from "../../../components/Loader";
import { Title } from "../../../components/Title";
import { useCrypto } from "../../../context";
import { EnhancedChartLine } from '../../../components/chartJS/EnhancedChartLine';
import { ContainerForBuyOrSell } from '../../../components/trendComponents/ContainerForBuyOrSell';
import styles from './index.module.scss';

type TabType = 'buysell' | 'watchlist' | 'portfolio' | 'openorders';
export const TradeOnlyCurrencyPage: React.FC = () => {
  const { isLoading, error, listing} = useCrypto();
  const { id } = useParams<{ id: string }>();
  const [priceChart, setPriceChart] = useState<number[]>([]);
  const [dateLabels, setDateLabels] = useState<string[]>([]);
  const [volumeData, setVolumeData] = useState<number[]>([]);
  const [chartReady, setChartReady] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('buysell');
  
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
      date.setMilliseconds(0);
      
    // Возвращаем ISO строку, округленную до часа
    labels.push(date.toISOString());
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
  // Render the content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'buysell':
        return (
          <div className={styles.containerBuyAndSell}>
            <ContainerForBuyOrSell btnText="Buy"/>
            <ContainerForBuyOrSell btnText="Sell"/>
          </div>
        );
      case 'watchlist':
        return <div className={styles.tabContent}>Watchlist content</div>;
      case 'portfolio':
        return <div className={styles.tabContent}>Portfolio content</div>;
      case 'openorders':
        return <div className={styles.tabContent}>Open Orders content</div>;
      default:
        return null;
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorComponent />;
  if (!result) return <div className="error-container">Cryptocurrency not found</div>;
  
  return (
    <div className={styles.pageWrapper}>
      <Title heading="h2">Trade {result.name}</Title> 
      
      <section className={styles.chartSection}>
        {chartReady ? (
          <EnhancedChartLine priceData={priceChart} labels={dateLabels}  volumeData={volumeData}/>
        ) : (
          <div className="chart-loading">
            Preparing chart data...
          </div>
        )}
      </section>

      <div className={styles.container}>
        <nav className={styles.navigationButtons}>
          <button 
            className={activeTab === 'buysell' ? styles.active : ''} 
            onClick={() => setActiveTab('buysell')}
          >
            Buy/Sell
          </button>
          <button 
            className={activeTab === 'watchlist' ? styles.active : ''} 
            onClick={() => setActiveTab('watchlist')}
          >
            Watchlist
          </button>
          <button 
            className={activeTab === 'portfolio' ? styles.active : ''} 
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio
          </button>
          <button 
            className={activeTab === 'openorders' ? styles.active : ''} 
            onClick={() => setActiveTab('openorders')}
          >
            Open Orders
          </button>
        </nav>
        
        {renderTabContent()}
      </div>
    </div>
  )
}
