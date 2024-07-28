import React from "react";
import { useLeaderboard } from "../useLeaderboard";

const TetrisLB = () => {
  const { sortedTetris } = useLeaderboard();
  return (
    <div className="mt-3 pb-20 w-1/2">
      <h1 className="text-2xl font-bold">Tetris Leaderboard - Top 10</h1>
      <table className="w-full text-center">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>High Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedTetris.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.tetrisHighScore}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TetrisLB;
