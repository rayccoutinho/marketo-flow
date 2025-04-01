import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
  ScriptableTooltipContext
} from 'chart.js';
import { useTheme } from '@mui/material';
import ModernChartWrapper from './ModernChartWrapper';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartData {
  labels: string[];
  current: number[];
  previous: number[];
}

interface LineChartProps {
  data: LineChartData;
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const theme = useTheme();

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: theme.palette.text.primary,
          usePointStyle: true,
          padding: 16,
          font: {
            family: theme.typography.fontFamily,
            size: 13,
            style: 'normal' as const
          }
        }
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        bodyFont: {
          family: theme.typography.fontFamily,
          size: 13,
          style: 'normal' as const
        },
        titleFont: {
          family: theme.typography.fontFamily,
          size: 14,
          weight: 'bold' as const
        },
        cornerRadius: 8,
        boxPadding: 6,
        usePointStyle: true
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            family: theme.typography.fontFamily,
            size: 12
          }
        },
        border: { display: false }
      },
      y: {
        grid: {
          color: theme.palette.divider,
          drawTicks: false
        },
        ticks: {
          color: theme.palette.text.secondary,
          padding: 8,
          font: {
            family: theme.typography.fontFamily,
            size: 12
          }
        },
        border: { display: false }
      }
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 6
      }
    }
  };

  const chartData: ChartData<'line'> = {
    labels: data.labels,
    datasets: [
      {
        label: 'Current Period',
        data: data.current,
        borderColor: theme.palette.primary.main,
        backgroundColor: 'transparent',
        borderWidth: 3,
        tension: 0.4,
        fill: true
      },
      {
        label: 'Previous Period',
        data: data.previous,
        borderColor: theme.palette.secondary.main,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  };

  return (
    <ModernChartWrapper title="Performance Trend">
      <Line data={chartData} options={options} />
    </ModernChartWrapper>
  );
};

export default LineChart;