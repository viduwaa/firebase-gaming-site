import { useEffect, useState } from "react";
import OverAllLB from "./lbComponents/OverAllLB";
import SnakeLB from "./lbComponents/SnakeLB";
import TetrisLB from "./lbComponents/TetrisLB";
import { useLeaderboard } from "./useLeaderboard";
import LeaderLoader from "../../../loader/LeaderLoader";

const Leaderboard = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  });
  return (
    <>
      {loading ? (
        <LeaderLoader/>
      ) : (
        <>
          {" "}
          <OverAllLB />
          <div className="mt-5 flex gap-10">
            <SnakeLB />
            <TetrisLB />
          </div>
        </>
      )}
    </>
  );
};

export default Leaderboard;
