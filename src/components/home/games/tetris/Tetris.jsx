import React, { useRef, useState } from "react";
import Stage from "./tetrisComponents/Stage/Stage";
import Display from "./tetrisComponents/Display/Display";
import StartButton from "./tetrisComponents/StartButton/StartButton";
import "./Tetris.css";
import { createStage } from "./gameHelpers";
import { useInterval } from "./hooks/useInterval";
import { usePlayer } from "./hooks/usePlayer";
import { useStage } from "./hooks/useStage";

const Tetris = () => {
  const [dropTime, setDroptime] = useState(null);
  const [gameOver, setgameOver] = useState(true);

  const gameArea = useRef(null);

  const { player, updatePlayerPositon, resetPlayer } = usePlayer();
  const { stage, setStage } = useStage(player, resetPlayer);

  const movePlayer = (dir) => {
    updatePlayerPositon({ x: dir, y: 0, collided: false });
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode == 40) {
        setDroptime(1000);
      }
    }
  };

  const handleStartGame = () => {
    if(gameArea.current)gameArea.current.focus();
    setStage(createStage());
    setDroptime(1000)
    resetPlayer();
    setgameOver(false);
  }

  const move = ({ keyCode, repeat }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        // Just call once
        if (repeat) return;
        setDroptime(30);
      } else if (keyCode === 38) {
        playerRotate(stage);
      }
    }
  };

  const drop = ()=>{
    updatePlayerPositon({ x: 0, y: 1, collided: false });
  }

  useInterval(()=>{
    drop()
    
  },dropTime)

  return (
    <div
      className="h-[80vh] w-full overflow-hidden outline-none"
      tabIndex={0} onKeyDown={move} onKeyUp={keyUp} ref={gameArea}
    >
      <div className="mx-auto mt-0 flex flex-col items-center p-10">
        <div className="display">
          {gameOver ? (
            <>
              <Display gameOver={gameOver} text="Game Over!" />
              <StartButton callBack={handleStartGame} />
            </>
          ) : (
            <>
              <Display text={`Score :`} />
              <Display text={`Text :`} />
              <Display text={`Level :`} />
            </>
          )}
        </div>
        <Stage stage={stage} />
      </div>
    </div>
  );
};

export default Tetris;
