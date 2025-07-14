import React, { useState } from 'react';

const Grid = ({ streak, missedStreaks }) => {
  const [localGrid, setLocalGrid] = useState(() => {
    const savedGrid = JSON.parse(localStorage.getItem("grid"));
    return Array.isArray(savedGrid) ? savedGrid : Array(100).fill(null);
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">Progress Grid</h2>
      <p className="text-center mb-4">Streak: {streak} 🔥</p>
      <p className="text-center mb-4">Missed Streaks: {missedStreaks} ❌</p>

      <div className="grid grid-cols-10 gap-1 mb-6">
        {localGrid.map((pixel, index) => (
          <div
            key={index}
            className="w-6 h-6 border"
            style={{ backgroundColor: pixel ? pixel.color : 'transparent' }}
            title={pixel ? pixel.task : ''}
          />
        ))}
      </div>

      {/* 🎖️ Badge Encouragements */}
      <div className="text-center mt-4">
        {streak >= 50 && <p className="text-purple-600 font-bold">🏆 Ultimate Streak Legend – 50+ streaks!</p>}
        {streak >= 20 && <p className="text-yellow-600 font-bold">🥇 Consistency Master – 20+ streaks!</p>}
        {streak >= 10 && <p className="text-green-600 font-bold">🏅 Streak Star – 10+ streaks!</p>}
      </div>
    </div>
  );
};

export default Grid;
