import React from 'react';
import { Pie } from 'react-chartjs-2';
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

interface TaskCompletionChartProps {
  approved: number;
  pending: number;
  draft: number;
}

const TaskCompletionChart: React.FC<TaskCompletionChartProps> = ({ 
  approved, 
  pending, 
  draft 
}) => {
  const theme = useTheme();

  const chartData = {
    labels: ['Aprovado', 'Pendente', 'Rascunho'],
    datasets: [
      {
        data: [approved, pending, draft],
        backgroundColor: [
          theme.palette.success.main,
          theme.palette.warning.main,
          theme.palette.error.main
        ],
        borderColor: [
          theme.palette.success.dark,
          theme.palette.warning.dark,
          theme.palette.error.dark
        ],
        borderWidth: 1,
        borderRadius: 6,
        spacing: 2
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
          pointStyle: 'rectRounded',
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
    <ModernChartWrapper title="Status de Briefing">
      <Pie data={chartData} options={options} />
    </ModernChartWrapper>
  );
};

export default TaskCompletionChart;