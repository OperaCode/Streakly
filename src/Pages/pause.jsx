import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Chart from "../components/Chart";
import Grid from "../components/Grid";
import CardSwipe from "../components/CardSwipe";

const Home = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [newTask, setNewTask] = useState({
    topic: "",
    description: "",
    timeFrame: "",
    id: null,
  });
  
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
        const taskTime = new Date(task.timeFrame);
        if (now > taskTime) {
          // Task is overdue – reset streak, increment missedStreaks
          setStreak(0);
          localStorage.setItem("streak", "0");

          const newMissed = missedStreaks + 1;
          setMissedStreaks(newMissed);
          localStorage.setItem("missedStreaks", newMissed.toString());
          return false;
        }
        return true; // Keep task if not overdue
      });

      // Update tasks state and localStorage
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

  // Add Task
  const addTask = () => {
    if (newTask.topic && newTask.description && newTask.timeFrame) {
      const updatedTasks = [...tasks, { ...newTask, id: Date.now() }];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setNewTask({ topic: "", description: "", timeFrame: "", id: null });
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Header */}
      <nav className="bg-white shadow p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            Streakly
          </Link>
          <div className="space-x-6 hidden md:block">
            <Link to="/" className="text-gray-600 hover:text-indigo-600">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-indigo-600">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-indigo-600">
              Contact
            </Link>
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
            {["topic", "description", "timeFrame"].map((field) => (
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
          {/* swipe component */}
          <CardSwipe tasks={tasks} />

        </motion.div>

        {/* Grid */}
        <motion.div
          className="bg-gray-50 p-6 rounded-lg shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* grid component */}
          <Grid  streak={streak} missedStreaks={missedStreaks} />

        </motion.div>

        {/* Trends */}
        <motion.div
          className="bg-gray-50 p-6 rounded-lg shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {/* Chart component */}
          <Chart dailyCompletions={dailyCompletions} />
        </motion.div>
      </main>

      <footer className="bg-indigo-700 text-white py-6 text-center mt-12">
        <p>© 2025 Streakly. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
