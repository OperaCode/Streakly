import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TinderCard from 'react-tinder-card';
import html2canvas from 'html2canvas';
import { Line } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const Home = () => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [newTask, setNewTask] = useState({ topic: '', description: '', timeFrame: '', id: null });
  const [grid, setGrid] = useState(JSON.parse(localStorage.getItem('grid')) || Array(100).fill(null));
  const [streak, setStreak] = useState(Number(localStorage.getItem('streak')) || 0);
  const [dailyCompletions, setDailyCompletions] = useState(JSON.parse(localStorage.getItem('dailyCompletions')) || [0,0,0,0,0,0,0]);
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());
  const [missedStreaks, setMissedStreaks] = useState(Number(localStorage.getItem('missedStreaks')) || 0);


  useEffect(() => {
    const checkDay = () => {
      const today = new Date().toDateString();
      if (today !== currentDate) {
        setStreak(0);
        localStorage.setItem('streak', '0');
        setCurrentDate(today);
        setDailyCompletions([0,0,0,0,0,0,0]);
        localStorage.setItem('dailyCompletions', JSON.stringify([0,0,0,0,0,0,0]));
      }
    };
    const interval = setInterval(checkDay, 60000);
    return () => clearInterval(interval);
  }, [currentDate]);


  useEffect(() => {
  const checkOverdueTasks = () => {
    const now = new Date();
    const updatedTasks = tasks.filter(task => {
      const taskTime = new Date(task.timeFrame);
      if (now > taskTime) {
        // Task is overdue – reset streak, increment missedStreaks
        setStreak(0);
        localStorage.setItem('streak', '0');

        const newMissed = missedStreaks + 1;
        setMissedStreaks(newMissed);
        localStorage.setItem('missedStreaks', newMissed.toString());
        return false; // Remove overdue task from list
      }
      return true; // Keep task if not overdue
    });

    // Update tasks state and localStorage
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const interval = setInterval(checkOverdueTasks, 60000);
  return () => clearInterval(interval);
}, [tasks, missedStreaks, streak]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const addTask = () => {
    if (newTask.topic && newTask.description && newTask.timeFrame) {
      const updatedTasks = [...tasks, { ...newTask, id: Date.now() }];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setNewTask({ topic: '', description: '', timeFrame: '', id: null });
    } else {
      alert('Please fill in all fields');
    }
  };

  const onSwipe = (direction, task, index) => {
    if (direction === 'right') {
      const newGrid = [...grid];
      const emptyIndex = newGrid.findIndex((pixel) => !pixel);
      if (emptyIndex !== -1) {
        newGrid[emptyIndex] = { task: task.topic, color: `hsl(${Math.random() * 360}, 70%, 50%)` };
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
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  };

  const exportGrid = () => {
    const gridElement = document.querySelector('.grid');
    if (gridElement) {
      html2canvas(gridElement, { scale: 2 }).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'streakly-grid.png';
        link.href = canvas.toDataURL('image/png');
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
    <div className="min-h-screen bg-white font-inter">
      {/* Header */}
      <nav className="bg-white shadow p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600">Streakly</Link>
          <div className="space-x-6 hidden md:block">
            <Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
            <Link to="/about" className="text-gray-600 hover:text-indigo-600">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-indigo-600">Contact</Link>
          </div>
        </div>
      </nav>

      <main className="p-6 max-w-4xl mx-auto space-y-12">
        {/* Hero */}
        <motion.section 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-indigo-700 mb-2">Build Your Streaks</h1>
          <p className="text-gray-600">Track tasks, swipe to complete, and grow your streak daily.</p>
        </motion.section>

        {/* Task Input */}
        <motion.div 
          className="bg-gray-50 p-6 rounded-lg shadow space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-center text-indigo-700">Add New Task</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {['topic', 'description', 'timeFrame'].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                value={newTask[field]}
                onChange={handleInputChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="border p-3 rounded focus:ring focus:ring-indigo-200"
              />
            ))}
            <button
              onClick={addTask}
              className="bg-indigo-600 text-white rounded p-3 hover:bg-indigo-700 transition"
            >
              Add Task
            </button>
          </div>
        </motion.div>

        {/* Swipe Cards */}
        <motion.div
          className="bg-gray-50 p-6 rounded-lg shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">Swipe Tasks</h2>
          <div className="relative h-72 flex justify-center">
            <AnimatePresence>
              {tasks.length ? (
                tasks.map((task, index) => (
                  <TinderCard
                    key={task.id}
                    onSwipe={(dir) => onSwipe(dir, task, index)}
                    className="absolute w-full md:w-3/5 bg-white p-4 rounded shadow"
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
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="bg-gray-50 p-6 rounded-lg shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">Progress Grid</h2>
          <p className="text-center mb-4">Streak: {streak} 🔥</p>
          <p className="text-center mb-4">Missed Streaks: {missedStreaks} ❌</p>

          <div className="grid grid-cols-10 gap-1 mb-6">
            {grid.map((pixel, index) => (
              <div
                key={index}
                className="w-6 h-6 border"
                style={{ backgroundColor: pixel ? pixel.color : 'transparent' }}
                title={pixel ? pixel.task : ''}
              />
            ))}
          </div>
          <button
            onClick={exportGrid}
            className="bg-indigo-600 text-white w-full rounded p-3 hover:bg-indigo-700 transition"
          >
            Export Grid
          </button>
        </motion.div>

        {/* Trends */}
        <motion.div
          className="bg-gray-50 p-6 rounded-lg shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">Weekly Trends</h2>
          <Line data={chartData} options={chartOptions} />
        </motion.div>
      </main>

      <footer className="bg-indigo-700 text-white py-6 text-center mt-12">
        <p>© 2025 Streakly. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;