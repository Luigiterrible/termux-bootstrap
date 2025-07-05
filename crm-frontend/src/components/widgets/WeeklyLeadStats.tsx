// src/components/widgets/WeeklyLeadStats.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Leads',
      data: [12, 19, 3, 5, 2, 3, 7],
      backgroundColor: '#4F46E5',
      borderRadius: 6,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 5,
      },
    },
  },
};

const WeeklyLeadStats: React.FC = () => {
  const totalLeads = data.datasets[0].data.reduce((sum, val) => sum + val, 0);

  return (
    <div className="h-full flex flex-col">
      <div className="text-xl font-bold text-gray-800 mb-2">Weekly Lead Stats</div>
      <div className="text-sm text-gray-500 mb-4">Total this week: {totalLeads}</div>
      <div className="flex-grow">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default WeeklyLeadStats;
