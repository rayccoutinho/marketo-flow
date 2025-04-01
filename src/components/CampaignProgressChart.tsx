import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
  TooltipItem
} from 'chart.js';
import { useTheme } from '@mui/material';
import ModernChartWrapper from './ModernChartWrapper';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Campaign {
  id: string;
  name: string;
  progress: number;
  status: 'active' | 'paused';
  budget: number;
}

interface CampaignProgressChartProps {
  campaigns: Campaign[];
}

const CampaignProgressChart: React.FC<CampaignProgressChartProps> = ({ campaigns }) => {
  const theme = useTheme();

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 16,
        bodyFont: {
          family: theme.typography.fontFamily,
          size: 13,
          style: 'normal' as const,
          lineHeight: 1.2
        },
        titleFont: {
          family: theme.typography.fontFamily,
          size: 14,
          weight: 'bold' as const,
          lineHeight: 1.2
        },
        cornerRadius: 12,
        boxPadding: 8,
        usePointStyle: true,
        callbacks: {
          label: (tooltipItem: TooltipItem<'bar'>) => {
            const campaign = campaigns[tooltipItem.dataIndex];
            return [
              `Progress: ${tooltipItem.raw}%`,
              `Status: ${campaign.status}`,
              `Budget: $${(campaign.budget / 1000).toFixed(1)}k`
            ];
          }
        }
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
          drawTicks: false,
          lineWidth: 1
        },
        ticks: {
          color: theme.palette.text.secondary,
          padding: 8,
          font: {
            family: theme.typography.fontFamily,
            size: 12
          },
          callback: (value: string | number) => `${value}%`
        },
        border: { display: false },
        min: 0,
        max: 100
      }
    },
    animation: {
      duration: 800,
      easing: 'easeOutQuart' as const
    }
  };

  const data: ChartData<'bar'> = {
    labels: campaigns.map((c: Campaign) => c.name),
    datasets: [{
      label: 'Progress',
      data: campaigns.map((c: Campaign) => c.progress),
      backgroundColor: theme.palette.primary.light,
      hoverBackgroundColor: theme.palette.primary.main,
      borderRadius: 8,
      borderSkipped: false,
      barThickness: 24,
      maxBarThickness: 32
    }]
  };

  return (
    <ModernChartWrapper title="Campaign Progress">
      <Bar data={data} options={options} />
    </ModernChartWrapper>
  );
};

export default CampaignProgressChart;