import React from "react";
import TinderCard from "react-tinder-card";

const CardSwipe = ({ tasks, setTasks, setStreak, setDailyCompletions, grid, setGrid }) => {
  const onSwipe = (direction, task, index) => {
    if (direction === "right") {
      const todayIndex = new Date().getDay();
      const completions = JSON.parse(
        localStorage.getItem("dailyCompletions")
      ) || [0, 0, 0, 0, 0, 0, 0];
      completions[todayIndex] += 1;
      localStorage.setItem("dailyCompletions", JSON.stringify(completions));
      setDailyCompletions(completions);

      const newStreak = Number(localStorage.getItem("streak") || 0) + 1;
      localStorage.setItem("streak", newStreak.toString());
      setStreak(newStreak);

      // 💡 Add to grid
      const newGrid = [...grid];
      const emptyIndex = newGrid.findIndex((pixel) => !pixel);
      if (emptyIndex !== -1) {
        newGrid[emptyIndex] = {
          task: task.topic,
          color: `hsl(${Math.random() * 360}, 70%, 50%)`,
        };
        setGrid(newGrid);
        localStorage.setItem("grid", JSON.stringify(newGrid));
      }

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
      <div className="relative h-96 flex justify-center">
        {tasks.length ? (
          tasks.map((task, index) => (
            <TinderCard
              key={task.id || index}
              onSwipe={(dir) => onSwipe(dir, task, index)}
              preventSwipe={["up", "down"]}
              className="absolute w-full md:w-3/5 bg-white p-4 rounded shadow"
            >
              <h3 className="text-xl font-semibold text-center mb-2">
                {task.topic}
              </h3>
              <ul className="list-disc list-inside text-gray-600 mb-2">
                {(task.description || "").split(",").map((item, i) => (
                  <li key={i}>{item.trim()}</li>
                ))}
              </ul>
              <p className="text-center text-gray-500 text-sm mt-2">
                {task.timeFrame}
              </p>
            </TinderCard>
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks added</p>
        )}
      </div>
    </div>
  );
};

export default CardSwipe;
