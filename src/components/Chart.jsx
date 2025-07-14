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
  if (!Array.isArray(dailyCompletions) || dailyCompletions.length !== 7) {
    dailyCompletions = [0,0,0,0,0,0,0];
  }

  const chartData = {
    labels: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    datasets: [{
      label: 'Tasks Completed',
      data: dailyCompletions,
      borderColor: '#4F46E5',
      backgroundColor: function(context) {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return null;
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, 'rgba(79, 70, 229, 0.4)');
        gradient.addColorStop(1, 'rgba(79, 70, 229, 0.1)');
        return gradient;
      },
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
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        suggestedMax: Math.max(...dailyCompletions) + 1,
      },
      x: { grid: { display: false } },
    },
  };

  return (
    <div aria-label="Weekly task completion chart">
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">Weekly Trends</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};


export default Chart
