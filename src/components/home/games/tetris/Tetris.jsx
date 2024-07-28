import Board from "./components/Board";
import UpcomingBlocks from "./components/UpcomingBlocks";
import { useTetris } from "./hooks/useTetris";
import "./Tetris.css";

const Tetris = () => {
  const { board, startGame, isPlaying, score, upcomingBlocks,highScore } = useTetris();
  return (
    <>
      <h1 className="vt323-regular p-2 text-center text-[2rem]">Tetris</h1>
      <div className="tetris">
        <div className="boardwrapper relative">
          <Board currentBoard={board} />
            {isPlaying ? null : (<button
              className="vt323-regular border absolute top-[250px] right-[95px] bg-purple-700 p-2 text-[2rem] hover:bg-purple-600 hover:text-black"
              onClick={startGame}
            >
              New Game
            </button>)}
        </div>
        <div className="controls">
          <div className="scores vt323-regular p-3 text-[1.5rem]">
            <h2>Score: {score}</h2>
            <h2>High Score : {Number(localStorage.getItem("tetrisScore"))}</h2>
          </div>

          {isPlaying ? (
            <UpcomingBlocks upcomingBlocks={upcomingBlocks} />
          ) : (
            null
          )}
        </div>
      </div>
    </>
  );
};

export default Tetris;
