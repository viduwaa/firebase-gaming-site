import React, { useState } from "react";
import Stage from "./tetrisComponents/Stage/Stage";
import Display from "./tetrisComponents/Display/Display";
import StartButton from "./tetrisComponents/StartButton/StartButton";
import "./Tetris.css";
import { createStage } from "./gameHelpers";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setgameOver] = useState(true);

  return (
    <div className="h-[80vh] w-full overflow-hidden outline-none">
      <div className="mx-auto mt-0 flex flex-col items-center p-10">
        <div className="display">
          {gameOver ? (
            <>
              <Display gameOver={gameOver} text="Game Over!" />
              <StartButton callBack={()=>null} />
            </>
          ) : (
            <>
              <Display text={`Score :`} />
              <Display text={`Text :`} />
              <Display text={`Level :`} />
            </>
          )}
        </div>
        <Stage stage={createStage()} />
      </div>
    </div>
  );
};

export default Tetris;
