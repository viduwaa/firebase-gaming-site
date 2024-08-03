import Board from "./components/Board";
import UpcomingBlocks from "./components/UpcomingBlocks";
import { useTetris } from "./hooks/useTetris";
import "./Tetris.css";

const Tetris = () => {
  const { board, startGame, isPlaying, score, upcomingBlocks, highScore } =
    useTetris();
  return (
    <>
      <h1 className="vt323-regular p-2 text-center text-[1.5rem]">Tetris</h1>
      <div className="tetris">
        <div className="boardwrapper relative">
          <Board currentBoard={board} />
          {isPlaying ? null : (
            <button
              className="vt323-regular absolute right-[70px] top-[250px] border bg-purple-700 p-2 text-[2rem] hover:bg-purple-600 hover:text-black"
              onClick={startGame}
            >
              New Game
            </button>
          )}
        </div>
        <div className="controls">
          <div className="scores vt323-regular p-3 text-[1.5rem] flex flex-col  gap-2 border w-fit">
            <div>
              <h2>Score: {score}</h2>
              <h2>High Score : {highScore}</h2>
            </div>

            <div>
              <ul>
                <li className="text-base">1 line = 6 pts</li>
                <li className="text-base">2 line = 10 pts</li>
                <li className="text-base">3 line = 15 pts</li>
                <li className="text-base">4 line = 20 pts</li>
              </ul>
            </div>

            <div>
              <ul>
                <li className="vt323-regular text-lg">➡️⬅️ Move block side</li>
                <li className="vt323-regular text-lg">⬆️ Rotate block</li>
                <li className="vt323-regular text-lg">⬇️ Slide down block</li>
              </ul>
            </div>
          </div>

          {isPlaying ? (
            <UpcomingBlocks upcomingBlocks={upcomingBlocks} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Tetris;
