import React from "react";

const TaskInput = ({ newTask, handleInputChange, addTask }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow space-y-4">
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

        <textarea
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Description (comma separated)"
          className="border p-3 rounded focus:ring focus:ring-indigo-200 md:col-span-2"
        ></textarea>

        <input
          type="time"
          name="timeFrame"
          value={newTask.timeFrame}
          onChange={handleInputChange}
          placeholder="Time Frame"
          className="border p-3 rounded focus:ring focus:ring-indigo-200"
        />

        <button
          onClick={addTask}
          className="bg-indigo-600 text-white rounded p-3 hover:bg-indigo-700 transition"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskInput;
