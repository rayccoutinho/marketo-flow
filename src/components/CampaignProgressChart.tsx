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
} from 'chart.js';
import { useTheme } from '@mui/material';
import { Box, Typography } from '@mui/material';

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
  status?: 'active' | 'paused';
  budget?: number;
}

interface CampaignProgressChartProps {
  campaigns: Campaign[];
}

const CampaignProgressChart: React.FC<CampaignProgressChartProps> = ({ campaigns }) => {
  const theme = useTheme();

  // Configuração dos dados do gráfico
  const data = {
    labels: campaigns.map(c => c.name),
    datasets: [
      {
        label: 'Progresso',
        data: campaigns.map(c => c.progress),
        backgroundColor: campaigns.map(c => 
          c.progress < 30 ? theme.palette.error.main :
          c.progress < 70 ? theme.palette.warning.main :
          theme.palette.success.main
        ),
        borderRadius: 6,
        borderSkipped: false,
        borderWidth: 0,
        hoverBackgroundColor: campaigns.map(c => 
          c.progress < 30 ? theme.palette.error.dark :
          c.progress < 70 ? theme.palette.warning.dark :
          theme.palette.success.dark
        ),
        barThickness: 28,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            family: theme.typography.fontFamily,
            size: 12
          }
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: theme.palette.divider,
          drawBorder: false,
          borderDash: [4, 4],
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            family: theme.typography.fontFamily,
            size: 12
          },
          callback: (value: number | string) => `${value}%`,
          stepSize: 25
        }
      },
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.primary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        bodyFont: {
          family: theme.typography.fontFamily,
          size: 14
        },
        titleFont: {
          family: theme.typography.fontFamily,
          size: 14,
          weight: 'bold'
        },
        cornerRadius: 8,
        boxPadding: 6,
        callbacks: {
          label: (context: any) => {
            const campaign = campaigns[context.dataIndex];
            return [
              `Progresso: ${context.raw}%`,
              `Status: ${campaign.status === 'active' ? 'Ativa' : 'Pausada'}`,
              `Orçamento: R$ ${campaign.budget ? (campaign.budget / 1000).toFixed(1) + 'k' : 'N/A'}`
            ];
          }
        }
      }
    },
    animation: {
      duration: 800,
      easing: 'easeOutQuart'
    },
    layout: {
      padding: {
        top: 8,
        right: 8,
        bottom: 8,
        left: 8
      }
    }
  };

  return (
    <Box sx={{ 
      width: '100%',
      height: '100%',
      minHeight: '300px',
      position: 'relative'
    }}>
      <Bar 
        data={data} 
        options={options}
        plugins={[{
          id: 'customCenterText',
          beforeDraw: (chart) => {
            if (campaigns.length === 0) {
              const { ctx, width, height } = chart;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.font = '16px ' + theme.typography.fontFamily;
              ctx.fillStyle = theme.palette.text.secondary;
              ctx.fillText('Nenhuma campanha disponível', width / 2, height / 2);
              ctx.restore();
            }
          }
        }]}
      />
    </Box>
  );
};

export default CampaignProgressChart;