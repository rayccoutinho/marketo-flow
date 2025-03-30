// CampaignProgressChart.tsx
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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function CampaignProgressChart({ campaigns }: { campaigns: any[] }) {
  const data = {
    labels: campaigns.map(c => c.name),
    datasets: [
      {
        label: 'Progresso',
        data: campaigns.map(c => c.progress),
        backgroundColor: campaigns.map(c => 
          c.progress < 30 ? '#EF4444' :
          c.progress < 70 ? '#F59E0B' :
          '#10B981'
        ),
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Bar data={data} options={options} />;
}