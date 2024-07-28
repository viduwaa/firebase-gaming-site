import React from 'react'
import { useLeaderboard } from '../useLeaderboard';

const SnakeLB = () => {
  const { sortedSnake } = useLeaderboard();
  return (
    <div className="mt-3 w-1/2">
      <h1 className="text-2xl font-bold">Snake Leaderboard - Top 10</h1>
      <table className="text-center w-full">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>High Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedSnake.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.snakeHighScore}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default SnakeLB