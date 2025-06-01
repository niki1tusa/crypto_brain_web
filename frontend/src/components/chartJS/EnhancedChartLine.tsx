import React, { useState, useMemo } from 'react';
import './ChartLine.scss';
import { CandlestickChart } from './index';

// OHLC data interface
interface OHLCData {
  x: string | Date;
  o: number; // Open
  h: number; // High
  l: number; // Low
  c: number; // Close
}

interface EnhancedChartLineProps {
  // Option 1: Direct OHLC data
  ohlcData?: OHLCData[];
  
  // Option 2: Simple price data (will be converted to OHLC)
  priceData?: number[];
  labels?: string[];
  
  title?: string;
  volumeData?: number[];
  initialDarkMode?: boolean;
  upColor?: string;
  downColor?: string;
  wickColor?: string;
}

export const EnhancedChartLine: React.FC<EnhancedChartLineProps> = ({
  ohlcData,
  priceData = [],
  labels = [],
  title = 'Cryptocurrency Price Chart',
  volumeData,
  initialDarkMode = true,
}) => {
  // State for chart options
  const [darkMode, setDarkMode] = useState(initialDarkMode);
  const [showGrid, setShowGrid] = useState(false);
  const [showVolume, setShowVolume] = useState(!!volumeData);
  
  // Color themes for candlesticks
  const colorThemes = {
    classic: {
      upColor: '#26a69a',
      downColor: '#ef5350',
      wickColor: '#757575',
    },
    neon: {
      upColor: '#00ff88',
      downColor: '#ff4444',
      wickColor: '#888888',
    },
    blue: {
      upColor: '#4fc3f7',
      downColor: '#f06292',
      wickColor: '#90a4ae',
    },
    purple: {
      upColor: '#ba68c8',
      downColor: '#ff8a65',
      wickColor: '#9e9e9e',
    },
  };
  
  const [colorTheme, setColorTheme] = useState<keyof typeof colorThemes>('classic');
  
  // Convert simple price data to OHLC format
  const convertToOHLC = useMemo((): OHLCData[] => {
    if (ohlcData && ohlcData.length > 0) {
      return ohlcData;
    }
    
    if (!priceData || priceData.length === 0 || labels.length === 0) {
      return [];
    }
    
    const today = new Date();
    
    return priceData.map((price, index) => {
      const variation = price * 0.02;
      const open = index === 0 ? price : priceData[index - 1];
      const close = price;
      const high = Math.max(open, close) + Math.random() * variation;
      const low = Math.min(open, close) - Math.random() * variation;
      
      const label = labels[index];
      let dateString: string;
      console.log(label);
      if (label && label.match(/^\d{2}:\d{2}$/)) {
        // Формат "21:00"
        const [hours, minutes] = label.split(':').map(Number);
        const date = new Date(today);
        date.setHours(hours, minutes, 0, 0);
        dateString = date.toISOString();
      }  else {
        // Пытаемся парсить как ISO или создаем fallback
        const parsedDate = new Date(label);
        if (isNaN(parsedDate.getTime())) {
          const fallbackDate = new Date(today);
          fallbackDate.setHours(fallbackDate.getHours() - (labels.length - 1 - index));
          dateString = fallbackDate.toISOString();
        } else {
          dateString = parsedDate.toISOString();
        }
      }
      
      return {
        x: dateString,
        o: Number(open.toFixed(2)),
        h: Number(high.toFixed(2)),
        l: Number(low.toFixed(2)),
        c: Number(close.toFixed(2)),
      };
    });
  }, [ohlcData, priceData, labels]);
  
  // Convert volume data to chart format
  const formattedVolumeData = useMemo(() => {
    if (!volumeData || volumeData.length === 0) return undefined;
    
    return volumeData.map((volume, index) => ({
      x: labels[index] || new Date().toISOString(),
      y: volume,
    }));
  }, [volumeData, labels]);
  
  // Check if we have data to render
  const hasData = convertToOHLC.length > 0;
  
  // Calculate price stats with safety checks
  const currentCandle = hasData ? convertToOHLC[convertToOHLC.length - 1] : null;
  const firstCandle = hasData ? convertToOHLC[0] : null;
  const currentPrice = currentCandle?.c || 0;
  const firstPrice = firstCandle?.o || 0;
  const priceChange = hasData ? currentPrice - firstPrice : 0;
  const priceChangePercent = hasData && firstPrice !== 0 ? (priceChange / firstPrice) * 100 : 0;
  const highPrice = hasData ? Math.max(...convertToOHLC.map(d => d.h)) : 0;
  const lowPrice = hasData ? Math.min(...convertToOHLC.map(d => d.l)) : 0;
  
  // Check if we have enough data to render the chart
  if (!hasData) {
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
          {darkMode ? '🌙 Dark': '☀️ Light'}
        </button>
        
        <button 
          className={`control-button ${darkMode ? 'dark-mode' : ''} ${showGrid ? 'active' : ''}`}
          onClick={() => setShowGrid(!showGrid)}
        >
          {showGrid ? 'Hide Grid' : 'Show Grid'}
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
          onChange={(e) => setColorTheme(e.target.value as keyof typeof colorThemes)}
        >
          <option value="classic">Classic</option>
          <option value="neon">Neon</option>
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
        </select>
      </div>
      
      <CandlestickChart
        ohlcData={convertToOHLC}
        title={title}
        showGrid={showGrid}
        darkMode={darkMode}
        showVolume={showVolume && !!formattedVolumeData}
        volumeData={formattedVolumeData}
        upColor={colorThemes[colorTheme].upColor}
        downColor={colorThemes[colorTheme].downColor}
        wickColor={colorThemes[colorTheme].wickColor}
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
          {currentCandle && (
            <>
              <div className="stat-item">
                <span className="stat-label">Open:</span>
                <span className="stat-value">${currentCandle.o.toFixed(2)}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Close:</span>
                <span className="stat-value">${currentCandle.c.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};