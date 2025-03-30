// ContentStatusChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function ContentStatusChart({ data }: { data: any }) {
  const chartData = {
    labels: ['Publicado', 'Aprovado', 'Em Progresso', 'Não Iniciado'],
    datasets: [
      {
        data: [data.published, data.approved, data.in_progress, data.not_started],
        backgroundColor: [
          '#10B981',
          '#3B82F6',
          '#F59E0B',
          '#EF4444'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return <Pie data={chartData} options={options} />;
}