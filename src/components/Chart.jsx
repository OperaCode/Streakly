import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend,Filler);

const Chart = ({ dailyCompletions }) => {
  const chartData = {
    labels: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    datasets: [{
      label: 'Tasks Completed',
      data: dailyCompletions,
      borderColor: '#4F46E5',
      backgroundColor: 'rgba(79, 70, 229, 0.2)',
      fill: true,
      tension: 0.3,
      pointRadius: 5,
      pointHoverRadius: 8,
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: { enabled: true },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">Weekly Trends</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default Chart
