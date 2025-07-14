import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import html2canvas from 'html2canvas';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title);

const Home = () => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [newTask, setNewTask] = useState({ topic: '', description: '', timeFrame: '' });
  const [grid, setGrid] = useState(JSON.parse(localStorage.getItem('grid')) || Array(100).fill(null));
  const [streak, setStreak] = useState(Number(localStorage.getItem('streak')) || 0);
  const [dailyCompletions, setDailyCompletions] = useState(JSON.parse(localStorage.getItem('dailyCompletions')) || [0,0,0,0,0,0,0]);
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());

  useEffect(() => {
    const checkDay = () => {
      const today = new Date().toDateString();
      if (today !== currentDate) {
        setStreak(0);
        localStorage.setItem('streak', '0');
        setCurrentDate(today);
      }
    };
    const interval = setInterval(checkDay, 60000);
    return () => clearInterval(interval);
  }, [currentDate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const addTask = () => {
    if (newTask.topic.trim() && newTask.description.trim() && newTask.timeFrame.trim()) {
      const updatedTasks = [...tasks, { ...newTask }];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setNewTask({ topic: '', description: '', timeFrame: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  const onSwipe = (direction, task, index) => {
    if (direction === 'right') {
      const newGrid = [...grid];
      const emptyIndex = newGrid.findIndex((pixel) => !pixel);
      if (emptyIndex !== -1) {
        newGrid[emptyIndex] = { task: task.topic, color: '#4F46E5' }; // indigo
        setGrid(newGrid);
        localStorage.setItem('grid', JSON.stringify(newGrid));

        const newDailyCompletions = [...dailyCompletions];
        newDailyCompletions[new Date().getDay()] += 1;
        setDailyCompletions(newDailyCompletions);
        localStorage.setItem('dailyCompletions', JSON.stringify(newDailyCompletions));

        const newStreak = streak + 1;
        setStreak(newStreak);
        localStorage.setItem('streak', newStreak.toString());
      }
    }
  };

  const exportGrid = () => {
    const gridElement = document.querySelector('.grid');
    if (gridElement) {
      html2canvas(gridElement).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'streaktly-grid.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  const chartData = {
    labels: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    datasets: [{
      label: 'Tasks Completed',
      data: dailyCompletions,
      borderColor: '#4F46E5',
      backgroundColor: 'rgba(79, 70, 229, 0.2)',
      fill: true,
      tension: 0.3,
    }],
  };

  const chartOptions = {
    responsive: true,
    scales: { y: { beginAtZero: true } },
    animation: { duration: 1000, easing: 'easeInOutQuad' },
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <nav className="bg-indigo-600 text-white p-4 text-center shadow-md">
        <h1 className="text-3xl font-bold">Streaktly</h1>
      </nav>

      <main className="p-6 max-w-5xl mx-auto space-y-8">
        
        {/* Task Input */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700 text-center">Add New Task</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              name="topic"
              value={newTask.topic}
              onChange={handleInputChange}
              placeholder="Task Title"
              className="border p-2 rounded focus:ring focus:ring-indigo-200"
            />
            <input
              type="text"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              placeholder="Short Description"
              className="border p-2 rounded focus:ring focus:ring-indigo-200"
            />
            <input
              type="text"
              name="timeFrame"
              value={newTask.timeFrame}
              onChange={handleInputChange}
              placeholder="Time Frame (e.g. Today)"
              className="border p-2 rounded focus:ring focus:ring-indigo-200"
            />
          </div>
          <button
            onClick={addTask}
            className="bg-indigo-600 text-white py-2 px-4 rounded w-full hover:bg-indigo-700 transition-colors"
          >
            Add Task
          </button>
        </div>

        {/* Swipe Cards */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700 text-center">Swipe Tasks</h2>
          <div className="relative h-64">
            {tasks.length ? (
              tasks.map((task, index) => (
                <TinderCard
                  key={index}
                  onSwipe={(dir) => onSwipe(dir, task, index)}
                  className="absolute w-full bg-indigo-50 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                  preventSwipe={['up', 'down']}
                >
                  <h3 className="text-xl font-semibold text-center mb-2">{task.topic}</h3>
                  <p className="text-center text-gray-600">{task.description}</p>
                  <p className="text-center text-gray-500 text-sm mt-2">{task.timeFrame}</p>
                </TinderCard>
              ))
            ) : (
              <p className="text-center text-gray-500">No tasks added</p>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700 text-center">Your Progress Grid</h2>
          <p className="text-center mb-4 text-lg font-semibold text-indigo-600">Streak: {streak} 🔥</p>
          <div className="grid grid-cols-10 gap-1 mb-4">
            {grid.map((pixel, index) => (
              <div
                key={index}
                className="w-6 h-6 border border-gray-200 hover:scale-110 transition-transform"
                style={{ backgroundColor: pixel ? pixel.color : 'transparent' }}
                title={pixel ? pixel.task : ''}
              />
            ))}
          </div>
          <button
            onClick={exportGrid}
            className="bg-indigo-600 text-white py-2 px-4 rounded w-full hover:bg-indigo-700 transition-colors"
          >
            Export Grid
          </button>
        </div>

        {/* Trends */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700 text-center">Weekly Task Trends</h2>
          <Line data={chartData} options={chartOptions} />
        </div>

        {/* Motivational Quote */}
        <div className="bg-indigo-100 p-6 rounded-lg text-center text-indigo-800 font-semibold text-lg shadow-inner">
          “Small consistent actions build unstoppable streaks.”
        </div>
      </main>

      <footer className="bg-indigo-800 text-white py-6 text-center mt-8">
        <p>© 2025 Streaktly. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
