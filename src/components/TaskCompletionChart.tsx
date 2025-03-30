// TaskCompletionChart.tsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
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

export default function TaskCompletionChart({ approved, pending, draft }: { approved: number, pending: number, draft: number }) {
  const data = {
    labels: ['Aprovado', 'Pendente', 'Rascunho'],
    datasets: [
      {
        data: [approved, pending, draft],
        backgroundColor: [
          '#10B981',
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
    cutout: '70%',
  };

  return <Doughnut data={data} options={options} />;
}