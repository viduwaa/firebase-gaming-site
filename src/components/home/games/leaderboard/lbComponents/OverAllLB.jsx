import React from "react";
import { useLeaderboard } from "../useLeaderboard";

const OverAllLB = () => {
  const { sortedTop5 } = useLeaderboard();


  // Check if sortedTop5 has enough data
  const hasTop5 = sortedTop5.length >= 5;

  return (
    <>
      <h1 className="mt-2 text-center text-2xl font-bold">
        Over All Leaderboard
      </h1>
      <div className="border">
        {hasTop5 && (
          <>
            <div className="flex justify-center gap-3 border-b-2 p-3">
              <div>
                <img src={sortedTop5[0].avatar} alt="avatar" className="h-14 w-14 border" />
                <h1 className="mt-1 text-center">Rank 1</h1>
              </div>
              <div>
                <p className="text-xl">{sortedTop5[0].userName}</p>
                <p className="text-xl">High Score : {sortedTop5[0].totalScore}</p>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="flex flex-1 justify-center gap-3 border-r-2 p-3">
                <div>
                  <img src={sortedTop5[1].avatar} alt="avatar" className="h-14 w-14 border" />
                  <h1 className="mt-1 text-center">Rank 2</h1>
                </div>
                <div>
                  <p className="text-xl">{sortedTop5[1].userName} </p>
                  <p className="text-xl">{sortedTop5[1].totalScore} </p>
                </div>
              </div>
              <div className="flex flex-1 justify-center gap-3 p-3">
                <div>
                  <img src={sortedTop5[2].avatar} alt="avatar" className="h-14 w-14 border" />
                  <h1 className="mt-1 text-center">Rank 3</h1>
                </div>
                <div>
                  <p className="text-xl">{sortedTop5[2].userName} </p>
                  <p className="text-xl">{sortedTop5[2].totalScore} </p>
                </div>
              </div>
            </div>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="w-[33%] p-1 text-center">Rank 4</td>
                  <td className="w-[33%] p-1 text-center">{sortedTop5[3].userName}</td>
                  <td className="w-[33%] p-1 text-center">{sortedTop5[3].totalScore}</td>
                </tr>
                <tr>
                  <td className="w-[33%] p-1 text-center">Rank 5</td>
                  <td className="w-[33%] p-1 text-center">{sortedTop5[4].userName}</td>
                  <td className="w-[33%] p-1 text-center">{sortedTop5[4].totalScore}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}
        {!hasTop5 && (
          <p className="text-center mt-4">No leaderboard data available.</p>
        )}
      </div>
    </>
  );
};

export default OverAllLB;
