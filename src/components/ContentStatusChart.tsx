import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTheme } from '@mui/material';
import ModernChartWrapper from './ModernChartWrapper';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface ContentStatusData {
  published: number;
  approved: number;
  in_progress: number;
  not_started: number;
}

interface ContentStatusChartProps {
  data: ContentStatusData;
}

const ContentStatusChart: React.FC<ContentStatusChartProps> = ({ data }) => {
  const theme = useTheme();

  const chartData = {
    labels: ['Publicado', 'Aprovado', 'Em Progresso', 'Não Iniciado'],
    datasets: [
      {
        data: [
          data.published,
          data.approved,
          data.in_progress,
          data.not_started
        ],
        backgroundColor: [
          theme.palette.success.main,
          theme.palette.info.main,
          theme.palette.warning.main,
          theme.palette.error.main
        ],
        borderColor: [
          theme.palette.success.dark,
          theme.palette.info.dark,
          theme.palette.warning.dark,
          theme.palette.error.dark
        ],
        borderWidth: 1,
        cutout: '70%',
        radius: '90%'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          color: theme.palette.text.primary,
          font: {
            family: theme.typography.fontFamily,
            size: 12
          }
        }
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
          size: 13
        },
        titleFont: {
          family: theme.typography.fontFamily,
          size: 14,
          weight: 'bold' as const
        },
        cornerRadius: 8,
        boxPadding: 6
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  return (
    <ModernChartWrapper title="Status de Conteúdo">
      <Doughnut data={chartData} options={options} />
    </ModernChartWrapper>
  );
};

export default ContentStatusChart;