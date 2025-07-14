import React from 'react'
import TinderCard from "react-tinder-card";
import { motion, AnimatePresence } from "framer-motion";

const CardSwipe = ({tasks}) => {
    // On swipe actions
  const onSwipe = (direction, task, index) => {
    if (direction === "right") {
      const newGrid = [...grid];
      const emptyIndex = newGrid.findIndex((pixel) => !pixel);
      if (emptyIndex !== -1) {
        newGrid[emptyIndex] = {
          task: task.topic,
          color: `hsl(${Math.random() * 360}, 70%, 50%)`,
        };
        setGrid(newGrid);
        localStorage.setItem("grid", JSON.stringify(newGrid));

        const newDailyCompletions = [...dailyCompletions];
        newDailyCompletions[new Date().getDay()] += 1;
        setDailyCompletions(newDailyCompletions);
        localStorage.setItem(
          "dailyCompletions",
          JSON.stringify(newDailyCompletions)
        );

        // add to streak counter
        const newStreak = streak + 1;
        setStreak(newStreak);
        localStorage.setItem("streak", newStreak.toString());
      }
      // update tasks
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };
  return (
     <div>
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">
            Swipe Tasks
          </h2>
          <div className="relative h-72 flex justify-center">
            <AnimatePresence>
              {tasks.length ? (
                tasks.map((task, index) => (
                  <TinderCard
                    key={task.id}
                    onSwipe={(dir) => onSwipe(dir, task, index)}
                    className="absolute w-full md:w-3/5 bg-white p-4 rounded shadow"
                    preventSwipe={["up", "down"]}
                  >
                    <h3 className="text-xl font-semibold text-center mb-2">
                      {task.topic}
                    </h3>
                    <p className="text-center text-gray-600">
                      {task.description}
                    </p>
                    <p className="text-center text-gray-500 text-sm mt-2">
                      {task.timeFrame}
                    </p>
                  </TinderCard>
                ))
              ) : (
                <p className="text-center text-gray-500">No tasks added</p>
              )}
            </AnimatePresence>
          </div>
    </div>
  )
}

export default CardSwipe
