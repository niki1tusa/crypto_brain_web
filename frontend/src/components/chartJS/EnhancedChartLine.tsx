import React, { useState } from 'react';
import { ChartLine } from './index';
import './ChartLine.scss';

interface EnhancedChartLineProps {
  priceData: number[];
  labels: string[];
  title?: string;
  volumeData?: number[];
  initialDarkMode?: boolean;
  volumeColors?: string[];
  trendColor?: string;
  volumeScale?: number; // Parameter to control volume bar height
}

export const EnhancedChartLine: React.FC<EnhancedChartLineProps> = ({
  priceData = [],
  labels = [],
  title = 'Cryptocurrency Price Chart',
  volumeData,
  initialDarkMode = true,
  volumeScale = 0.3, // Default to 30% of original height
}) => {
  // State for chart options
  const [darkMode, setDarkMode] = useState(initialDarkMode);
  const [showGrid, setShowGrid] = useState(false);
  const [showGradient, setShowGradient] = useState(true);
  const [showVolume, setShowVolume] = useState(!!volumeData);
  
  // Color themes
  const themes = {
    blue: {
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    green: {
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
    purple: {
      borderColor: 'rgb(153, 102, 255)',
      backgroundColor: 'rgba(153, 102, 255, 0.5)',
    },
    orange: {
      borderColor: 'rgb(255, 159, 64)',
      backgroundColor: 'rgba(255, 159, 64, 0.5)',
    },
  };
  
  const [colorTheme, setColorTheme] = useState<keyof typeof themes>('blue');
  
  // Check if priceData array is not empty before calculating stats
  const hasData = priceData && priceData.length > 0;
  
  // Calculate price stats with safety checks
  const currentPrice = hasData ? priceData[priceData.length - 1] : 0;
  const firstPrice = hasData ? priceData[0] : 0;
  const priceChange = hasData ? currentPrice - firstPrice : 0;
  const priceChangePercent = hasData && firstPrice !== 0 ? (priceChange / firstPrice) * 100 : 0;
  const highPrice = hasData ? Math.max(...priceData) : 0;
  const lowPrice = hasData ? Math.min(...priceData) : 0;
  
  // Check if we have enough data to render the chart
  if (!hasData || labels.length === 0) {
    return (
      <div className="enhanced-chart-container">
        <div className="chart-loading">
          Waiting for price data...
        </div>
      </div>
    );
  }
  
  return (
    <div className="enhanced-chart-container">
      <div className={`chart-controls ${darkMode ? 'dark-mode' : ''}`}>
        <button 
          className={`control-button ${darkMode ? 'dark-mode' : ''} ${darkMode ? 'active' : ''}`}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
        
        <button 
          className={`control-button ${darkMode ? 'dark-mode' : ''} ${showGrid ? 'active' : ''}`}
          onClick={() => setShowGrid(!showGrid)}
        >
          {showGrid ? 'Hide Grid' : 'Show Grid'}
        </button>
        
        <button 
          className={`control-button ${darkMode ? 'dark-mode' : ''} ${showGradient ? 'active' : ''}`}
          onClick={() => setShowGradient(!showGradient)}
        >
          {showGradient ? 'Solid Fill' : 'Gradient Fill'}
        </button>
        
        {volumeData && volumeData.length > 0 && (
          <button 
            className={`control-button ${darkMode ? 'dark-mode' : ''} ${showVolume ? 'active' : ''}`}
            onClick={() => setShowVolume(!showVolume)}
          >
            {showVolume ? 'Hide Volume' : 'Show Volume'}
          </button>
        )}
        
        <select 
          className={`control-button ${darkMode ? 'dark-mode' : ''}`}
          value={colorTheme}
          onChange={(e) => setColorTheme(e.target.value as keyof typeof themes)}
        >
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="purple">Purple</option>
          <option value="orange">Orange</option>
        </select>
      </div>
      
      <ChartLine 
        priceData={priceData}
        labels={labels}
        title={title}
        borderColor={themes[colorTheme].borderColor}
        backgroundColor={themes[colorTheme].backgroundColor}
        showGrid={showGrid}
        showGradient={showGradient}
        darkMode={darkMode}
        showVolume={showVolume && !!volumeData && volumeData.length > 0}
        volumeData={volumeData}
        volumeScale={volumeScale}
      />
      
      <div className={`chart-info ${darkMode ? 'dark-mode' : ''}`}>
        <div className="price-stats">
          <div className="stat-item">
            <span className="stat-label">Current:</span>
            <span className="stat-value">
              ${currentPrice.toFixed(2)}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Change:</span>
            <span className={`stat-value ${priceChange >= 0 ? 'positive' : 'negative'}`}>
              {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">High:</span>
            <span className="stat-value">${highPrice.toFixed(2)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Low:</span>
            <span className="stat-value">${lowPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
