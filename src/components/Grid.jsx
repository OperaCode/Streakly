import React,{useState} from 'react'

const Grid = ({streak,missedStreaks}) => {
    const [grid, setGrid] = useState(
        JSON.parse(localStorage.getItem("grid")) || Array(100).fill(null)
      );
  return (
    <div>
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
    </div>
  )
}

export default Grid
