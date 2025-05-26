import React from 'react';
import './ChartLine.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement, // Added BarElement for bar chart support
  Title,
  Tooltip,
  Legend,
  Filler
);

// Define interface for props
interface ChartLineProps {
  priceData?: number[];
  labels?: string[];
  title?: string;
  borderColor?: string;
  backgroundColor?: string;
  showGrid?: boolean;
  showGradient?: boolean;
  darkMode?: boolean;
  showVolume?: boolean;
  volumeData?: number[];
  volumeScale?: number;
  volumeColors?: string[];
  trendColor?: string;
}

export const ChartLine: React.FC<ChartLineProps> = ({
  priceData = [100, 120, 115, 134, 168, 132, 200],
  labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  title = 'Price Change Chart',
  borderColor = 'rgb(53, 162, 235)',
  backgroundColor = 'rgba(53, 162, 235, 0.5)',
  showGrid = false,
  showGradient = true,
  darkMode = false,
  showVolume = false,
  volumeData,
  volumeScale = 0.05, // Reduced to 5% of maximum value
}) => {
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

  // Calculate price change percentage for tooltip
  const calculatePriceChange = (currentValue: number, previousValue: number) => {
    if (!previousValue) return '0.00%';
    const change = ((currentValue - previousValue) / previousValue) * 100;
    return `${change > 0 ? '+' : ''}${change.toFixed(2)}%`;
  };

  // Theme colors based on dark mode
  const theme = {
    backgroundColor: darkMode ? '#1e1e2f' : 'white',
    textColor: darkMode ? '#ffffff' : '#666666',
    gridColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    tooltipBackground: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    tooltipBorder: darkMode ? '#555' : '#ddd',
  };
  // Find maximum volume value
  const maxVolume = volumeData ? Math.max(...volumeData) : 0;
  
  // Create a fixed maximum for Y1 axis that will be 20 times larger than the maximum volume
  // This will allow the bars to occupy only 5% of the chart height
  const volumeAxisMax = maxVolume / volumeScale;
  
  // Use original volume data without scaling - we'll set a fixed maximum for Y1 axis instead
  const scaledVolumeData = volumeData ? [...volumeData] : [];
  // Chart configuration
  const options: ChartOptions<'line'> = {
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
        displayColors: true,
        callbacks: {
          label: (context) => {
            const value = context.raw as number;
            const datasetLabel = context.dataset.label || '';
            
            if (datasetLabel === 'Volume') {              // Show original volume value, not the scaled one
              const originalValue = volumeData ? volumeData[context.dataIndex] : 0;
              return `${datasetLabel}: ${originalValue.toLocaleString()} USD`;
            }
            
            // Add price change percentage if not the first point
            if (context.dataIndex > 0) {
              const previousValue = priceData[context.dataIndex - 1];
              const changePercent = calculatePriceChange(value, previousValue);
              return [`${datasetLabel}: ${formatPrice(value)}`, `Change: ${changePercent}`];
            }
            
            return `${datasetLabel}: ${formatPrice(value)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        position: 'right',
        grid: {
          display: showGrid,
          color: theme.gridColor,
          drawBorder: false,
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
      x: {
        grid: {
          display: showGrid,
          color: theme.gridColor,
          drawBorder: false,
        },
        ticks: {
          color: theme.textColor,
          maxRotation: 45,
          minRotation: 0,
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
      // Optional volume scale
      ...(showVolume && volumeData ? {
        y1: {
          type: 'linear' as const,
          display: true,
          position: 'left' as const,
          grid: {
            display: false,
          },
          ticks: {
            color: theme.textColor,
            callback: (value) => {
              return formatVolume(value as number);
            },
            // Hide tick labels on Y1 axis to avoid showing huge values
            display: false
          },
          title: {
            display: true,
            text: 'Volume',
            color: theme.textColor,
          },
          // Set fixed maximum for Y1 axis
          max: volumeAxisMax,
          // Start from zero for volume bars
          beginAtZero: true,
          // Hide the axis itself
          display: false
        },
      } : {}),
    },
    elements: {
      point: {
        radius: 2,
        hoverRadius: 5,
        hitRadius: 30,
        borderWidth: 2,
      },
      line: {
        tension: 0.2, // Smoother line
        borderWidth: 2,
        fill: showGradient ? 'start' : false,
        borderJoinStyle: 'round',
      },
    },
  };

  // Create gradient background if enabled
  const createGradient = (ctx: CanvasRenderingContext2D, color: string) => {
    if (!showGradient) return color;
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    
    // Properly handle different color formats
    let startColor, endColor;
    
    if (color.startsWith('rgb(')) {
      // Format rgb(r, g, b)
      const rgbValues = color.match(/\d+/g);
      if (rgbValues && rgbValues.length >= 3) {
        startColor = `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, 0.8)`;
        endColor = `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, 0.1)`;
      } else {
        // If RGB values couldn't be extracted, use default color
        startColor = 'rgba(53, 162, 235, 0.8)';
        endColor = 'rgba(53, 162, 235, 0.1)';
      }
    } else if (color.startsWith('rgba(')) {
      // Format rgba(r, g, b, a)
      const rgbaValues = color.match(/\d+(\.\d+)?/g);
      if (rgbaValues && rgbaValues.length >= 4) {
        startColor = `rgba(${rgbaValues[0]}, ${rgbaValues[1]}, ${rgbaValues[2]}, 0.8)`;
        endColor = `rgba(${rgbaValues[0]}, ${rgbaValues[1]}, ${rgbaValues[2]}, 0.1)`;
      } else {
        startColor = 'rgba(53, 162, 235, 0.8)';
        endColor = 'rgba(53, 162, 235, 0.1)';
      }
    } else if (color.startsWith('#')) {
      // Format #RRGGBB or #RGB
      // Convert HEX to RGB
      let r, g, b;
      
      if (color.length === 4) {
        // #RGB format
        r = parseInt(color[1] + color[1], 16);
        g = parseInt(color[2] + color[2], 16);
        b = parseInt(color[3] + color[3], 16);
      } else {
        // #RRGGBB format
        r = parseInt(color.slice(1, 3), 16);
        g = parseInt(color.slice(3, 5), 16);
        b = parseInt(color.slice(5, 7), 16);
      }
      
      startColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
      endColor = `rgba(${r}, ${g}, ${b}, 0.1)`;
    } else {
      // For other formats use default color
      startColor = 'rgba(53, 162, 235, 0.8)';
      endColor = 'rgba(53, 162, 235, 0.1)';
    }
    
    // Add color stops with proper color formats
    gradient.addColorStop(0, startColor);
    gradient.addColorStop(1, endColor);
    
    return gradient;
  };



  // Chart data
  const data = {
    labels,
    datasets: [
      {
        label: 'Price',
        data: priceData,
        borderColor: borderColor,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          return createGradient(ctx, backgroundColor);
        },
        yAxisID: 'y',
        pointBackgroundColor: borderColor,
        pointBorderColor: darkMode ? '#1e1e2f' : 'white',
        pointHoverBackgroundColor: 'white',
        pointHoverBorderColor: borderColor,
        pointHoverBorderWidth: 2,
        fill: true,
        type: 'line', // Explicitly specify the chart type
      },
      ...(showVolume && volumeData ? [
        {
          label: 'Volume',
          data: scaledVolumeData,
          type: 'bar',
          backgroundColor: 'rgba(128, 128, 128, 0.5)',
          borderColor: 'rgba(128, 128, 128, 0.5)',
          borderWidth: 1,
          yAxisID: 'y1',
          order: 1,
          barPercentage: 0.5, // Bar width relative to available space
        },
      ] : []),
    ],
  };

  return (
    <div className={`crypto-chart-container ${darkMode ? 'dark-mode' : ''}`}>
      <Line options={options} data={data} />
    </div>
  );
};
