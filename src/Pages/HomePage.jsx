import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Chart from "../components/Chart";
import Grid from "../components/Grid";
import CardSwipe from "../components/CardSwipe";

const HomePage = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [newTask, setNewTask] = useState({
    topic: "",
    description: "",
    timeFrame: "",
  });

  const [grid, setGrid] = useState(
    JSON.parse(localStorage.getItem("grid")) || Array(100).fill(null)
  );

  const [streak, setStreak] = useState(
    Number(localStorage.getItem("streak")) || 0
  );
  const [dailyCompletions, setDailyCompletions] = useState(
    JSON.parse(localStorage.getItem("dailyCompletions")) || [
      0, 0, 0, 0, 0, 0, 0,
    ]
  );
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());
  const [missedStreaks, setMissedStreaks] = useState(
    Number(localStorage.getItem("missedStreaks")) || 0
  );

  useEffect(() => {
    const checkDay = () => {
      const today = new Date().toDateString();
      if (today !== currentDate) {
        setStreak(0);
        localStorage.setItem("streak", "0");
        setCurrentDate(today);
        setDailyCompletions([0, 0, 0, 0, 0, 0, 0]);
        localStorage.setItem(
          "dailyCompletions",
          JSON.stringify([0, 0, 0, 0, 0, 0, 0])
        );
      }
    };
    const interval = setInterval(checkDay, 60000);
    return () => clearInterval(interval);
  }, [currentDate]);

  useEffect(() => {
    const checkOverdueTasks = () => {
      const now = new Date();
      const updatedTasks = tasks.filter((task) => {
        const taskTime = new Date(`1970-01-01T${task.timeFrame}:00`);
        if (now > taskTime) {
          setStreak(0);
          localStorage.setItem("streak", "0");

          const newMissed = missedStreaks + 1;
          setMissedStreaks(newMissed);
          localStorage.setItem("missedStreaks", newMissed.toString());
          return false;
        }
        return true;
      });

      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
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
      const taskWithId = { ...newTask, id: Date.now() };
      const updatedTasks = [...tasks, taskWithId];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setNewTask({ topic: "", description: "", timeFrame: "" });
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 bg-white shadow-md p-6 flex justify-between items-center max-w-7xl mx-auto"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-indigo-600">Streakly</h1>
        <nav className="space-x-8">
          {/* <Link to="/home" className="text-gray-600 hover:text-indigo-600 transition-colors" >Home</Link> */}
          <a
            href="#top"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Home
          </a>
          <a
            href="#grid"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Streaks
          </a>
          <a
            href="#chart"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Trends
          </a>
          <a
            href="/"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Exit
          </a>
        </nav>
      </motion.header>

      <main className="p-6 max-w-4xl mx-auto space-y-12">
        {/* Hero */}
        <motion.section
          id="top"
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-indigo-700 mb-2">
            Build Your Streaks
          </h1>
          <p className="text-gray-600">
            Track tasks, swipe to complete, and grow your streak daily.
          </p>
        </motion.section>

        {/* Task Input */}
        <motion.div
          className="bg-gray-50 p-6 rounded-lg shadow space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-center text-indigo-700">
            Add New Task
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              name="topic"
              value={newTask.topic}
              onChange={handleInputChange}
              placeholder="Topic"
              className="border p-3 rounded focus:ring focus:ring-indigo-200"
            />
            <input
              type="text"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              placeholder="Description (comma separated)"
              className="border p-3 rounded focus:ring focus:ring-indigo-200"
            />
            <input
              type="time"
              name="timeFrame"
              value={newTask.timeFrame}
              onChange={handleInputChange}
              placeholder="Time"
              className="border p-3 rounded focus:ring focus:ring-indigo-200"
            />
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
          <CardSwipe
            tasks={tasks}
            setTasks={setTasks}
            setStreak={setStreak}
            setDailyCompletions={setDailyCompletions}
            grid={grid}
            setGrid={setGrid}
          />
        </motion.div>

        {/* Grid */}
        <motion.div
          id="grid"
          className="bg-gray-50 p-6 rounded-lg shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Grid grid={grid} streak={streak} missedStreaks={missedStreaks} />
        </motion.div>

        {/* Trends */}
        <motion.div
          id="chart"
          className="bg-gray-50 p-6 rounded-lg shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Chart dailyCompletions={dailyCompletions} />
        </motion.div>
      </main>

      <footer className="bg-indigo-700 text-white py-6 text-center mt-12">
        <p>© 2025 Streakly. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
