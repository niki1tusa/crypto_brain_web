import React from 'react';
import './ChartLine.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import {
  CandlestickController,
  CandlestickElement,
  OhlcController,
  OhlcElement,
} from 'chartjs-chart-financial';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  CandlestickController,
  CandlestickElement,
  OhlcController,
  OhlcElement
);

// Define interface for OHLC data input
interface OHLCData {
  x: string | Date;
  o: number; // Open
  h: number; // High
  l: number; // Low
  c: number; // Close
}

// Define interface that matches FinancialDataPoint
interface FinancialDataPoint {
  x: number;
  o: number;
  h: number;
  l: number;
  c: number;
}

interface CandlestickChartProps {
  ohlcData?: OHLCData[];
  title?: string;
  showGrid?: boolean;
  darkMode?: boolean;
  showVolume?: boolean;
  volumeData?: { x: string | Date; y: number }[];
  upColor?: string;
  downColor?: string;
  wickColor?: string;
}

export const CandlestickChart: React.FC<CandlestickChartProps> = ({
  ohlcData = [
    { x: '2024-01-01', o: 100, h: 120, l: 95, c: 115 },
    { x: '2024-01-02', o: 115, h: 125, l: 110, c: 120 },
    { x: '2024-01-03', o: 120, h: 130, l: 115, c: 125 },
    { x: '2024-01-04', o: 125, h: 135, l: 120, c: 130 },
    { x: '2024-01-05', o: 130, h: 140, l: 125, c: 135 },
  ],
  title = 'Candlestick Chart',
  showGrid = true,
  darkMode = false,
  showVolume = false,
  volumeData,
  upColor = '#26a69a', // Green for bullish candles
  downColor = '#ef5350', // Red for bearish candles
  wickColor = '#757575', // Gray for wicks
}) => {
  
  console.log('CandlestickChart rendering with data:', ohlcData);
  console.log('Volume data:', volumeData);

  // Convert OHLCData to FinancialDataPoint format
// Convert OHLCData to FinancialDataPoint format
const convertToFinancialData = (data: OHLCData[]): FinancialDataPoint[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return data.map((item, index) => {
    let timestamp: number;
    
    if (typeof item.x === 'string') {
      // Если это время в формате "21:00"
      if (item.x.match(/^\d{1,2}:\d{2}$/)) {
        const [hours, minutes] = item.x.split(':').map(Number);
        const date = new Date(today);
        date.setHours(hours, minutes, 0, 0);
        timestamp = date.getTime();
      } else {
        // Попытка парсинга как полной даты
        const parsedDate = new Date(item.x);
        if (isNaN(parsedDate.getTime())) {
          // Fallback: создаем время на основе индекса
          const fallbackDate = new Date(today);
          fallbackDate.setHours(index, 0, 0, 0);
          timestamp = fallbackDate.getTime();
          console.warn('Using fallback timestamp for:', item.x);
        } else {
          timestamp = parsedDate.getTime();
        }
      }
    } else {
      timestamp = item.x.getTime();
    }
    
    return {
      x: timestamp,
      o: Number(item.o) || 0,
      h: Number(item.h) || 0,
      l: Number(item.l) || 0,
      c: Number(item.c) || 0,
    };
  });
};

  // Convert volume data to proper format
  const convertVolumeData = (data: { x: string | Date; y: number }[]) => {
    return data.map(item => ({
      x: typeof item.x === 'string' ? new Date(item.x).getTime() : item.x.getTime(),
      y: item.y,
    }));
  };

  // Format price with currency symbol
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Format volume numbers with K/M suffixes
  const formatVolume = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  // Theme colors based on dark mode
  const theme = {
    backgroundColor: darkMode ? '#1e1e2f' : 'white',
    textColor: darkMode ? '#ffffff' : '#666666',
    gridColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    tooltipBackground: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    tooltipBorder: darkMode ? '#555' : '#ddd',
  };

  // Convert data to proper format
  const financialData = convertToFinancialData(ohlcData);
  const convertedVolumeData = volumeData ? convertVolumeData(volumeData) : undefined;

  console.log('Converted financial data:', financialData);
  console.log('Converted volume data:', convertedVolumeData);

  
  // Chart configuration
  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: theme.textColor,
          font: {
            family: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            size: 12,
          },
          usePointStyle: true,
          pointStyle: 'rect',
        },
      },
      title: {
        display: true,
        text: title,
        color: theme.textColor,
        font: {
          family: "'Roboto', 'Helvetica', 'Arial', sans-serif",
          size: 16,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: theme.tooltipBackground,
        titleColor: darkMode ? '#fff' : '#333',
        bodyColor: darkMode ? '#fff' : '#333',
        borderColor: theme.tooltipBorder,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 6,
        displayColors: false,
        callbacks: {
          title: (context) => {
            const dataPoint = context[0];
            if (dataPoint && dataPoint.parsed && dataPoint.parsed.x) {
              try {
                const date = new Date(dataPoint.parsed.x);
                if (isNaN(date.getTime())) {
                  return 'Invalid Date';
                }
                return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                });
              } catch (error) {
                console.error('Error formatting tooltip date:', error);
                return 'Date Error';
              }
            }
            return '';
          },
          label: (context) => {
            try {
              const data = context.parsed as any;
              if (data && typeof data.o !== 'undefined') {
                const change = data.c - data.o;
                const changePercent = data.o !== 0 ? ((change / data.o) * 100).toFixed(2) : '0.00';
                const changeSymbol = change >= 0 ? '+' : '';
                
                return [
                  `Open: ${formatPrice(data.o)}`,
                  `High: ${formatPrice(data.h)}`,
                  `Low: ${formatPrice(data.l)}`,
                  `Close: ${formatPrice(data.c)}`,
                  `Change: ${changeSymbol}${formatPrice(change)} (${changeSymbol}${changePercent}%)`,
                ];
              }
              return [`Value: ${formatPrice(context.parsed.y)}`];
            } catch (error) {
              console.error('Error formatting tooltip label:', error);
              return ['Error formatting data'];
            }
          },
        },
      },
    },
    scales: {
  x: {
    type: 'time',
    adapters: {
      date: {
        locale: enUS,
      },
    },
    time: {
      unit: 'hour',
      stepSize: 1,
      displayFormats: {
        hour: 'HH:mm',
        day: 'MMM dd',
      },
      tooltipFormat: 'PPp',
      parser: false,
    },
    // Устанавливаем точные границы
    min: financialData.length > 0 ? Math.min(...financialData.map(d => d.x)) : undefined,
    max: financialData.length > 0 ? Math.max(...financialData.map(d => d.x)) : undefined,
    grid: {
      display: showGrid,
      color: theme.gridColor,
    },
    ticks: {
      color: theme.textColor,
      maxRotation: 45,
      minRotation: 0,
      // Ключевые настройки для точного соответствия данным
      source: 'data', // Берем метки только из данных
      maxTicksLimit: financialData.length, // Максимум меток = количеству данных
      autoSkip: false, // Не пропускаем метки автоматически
      font: {
        family: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      },
    },
    title: {
      display: true,
      text: 'Time',
      color: theme.textColor,
      font: {
        family: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        size: 12,
      },
    },
  },
      y: {
        beginAtZero: false,
        position: 'right',
        grid: {
          display: showGrid,
          color: theme.gridColor,
        },
        ticks: {
          color: theme.textColor,
          callback: (value) => {
            return formatPrice(value as number);
          },
          font: {
            family: "'Roboto', 'Helvetica', 'Arial', sans-serif",
          },
        },
        title: {
          display: true,
          text: 'Price (USD)',
          color: theme.textColor,
          font: {
            family: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            size: 12,
          },
        },
      },
      // Optional volume scale
      ...(showVolume && convertedVolumeData ? {
        y1: {
          type: 'linear' as const,
          position: 'left' as const,
          grid: {
            display: false,
          },
          ticks: {
            color: theme.textColor,
            callback: (value) => {
              return formatVolume(value as number);
            },
          },
          title: {
            display: true,
            text: 'Volume',
            color: theme.textColor,
          },
          beginAtZero: true,
        },
      } : {}),
    },
  };

// Chart data with proper structure for candlestick
const data: ChartData = {
  datasets: [
  {
      label: 'Price',
      type: 'candlestick',
      data: financialData,
      borderColor: wickColor,
      backgroundColor: 'transparent',
      borderColors: {
        up: upColor,
        down: downColor,
        unchanged: '#999999',
      },
      backgroundColors: {
        up: upColor,
        down: downColor,
        unchanged: '#999999',
      },
      borderWidth: 1,
      borderSkipped: false,
      // Добавляем настройки для размера свечей
      barPercentage: 0.6,
      categoryPercentage: 0.8,
    },
    ...(showVolume && convertedVolumeData ? [
      {
        label: 'Volume',
        type: 'bar' as const,
        data: convertedVolumeData,
        backgroundColor: 'rgba(128, 128, 128, 0.3)',
        borderColor: 'rgba(128, 128, 128, 0.5)',
        borderWidth: 1,
        yAxisID: 'y1',
        order: 1,
        barPercentage: 0.8,
      },
    ] : []),
  ],
};

  console.log('Final chart data structure:', data);

  return (
    <div className={`crypto-chart-container ${darkMode ? 'dark-mode' : ''}`} style={{ height: '400px', width: '100%' }}>
      <Chart 
        type="candlestick" 
        options={options} 
        data={data}
        height={400}
      />
    </div>
  );
};