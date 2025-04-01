import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { useTheme } from '@mui/material';
import ModernChartWrapper from './ModernChartWrapper';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutData {
  completed: number;
  inProgress: number;
  pending: number;
}

interface DonutChartProps {
  data: DonutData;
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const theme = useTheme();

  const chartData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [{
      data: [data.completed, data.inProgress, data.pending],
      backgroundColor: [
        theme.palette.success.main,
        theme.palette.warning.main,
        theme.palette.error.main
      ],
      borderWidth: 0,
      cutout: '80%',
      radius: '90%'
    }]
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
          color: theme.palette.text.primary,
          font: {
            family: theme.typography.fontFamily,
            size: 13
          }
        }
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        bodyColor: theme.palette.text.primary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        bodyFont: {
          family: theme.typography.fontFamily,
          size: 13
        },
        cornerRadius: 8,
        boxPadding: 6,
        usePointStyle: true
      }
    },
    cutout: '75%'
  };

  return (
    <ModernChartWrapper title="Task Distribution" sx={{ p: 3 }}>
      <Doughnut data={chartData} options={options} />
    </ModernChartWrapper>
  );
};

export default DonutChart;