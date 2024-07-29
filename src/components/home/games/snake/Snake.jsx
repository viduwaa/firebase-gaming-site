import React, { useEffect, useRef, useState } from "react";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useUserStore } from "../../../../lib/userStore";
import { db } from "../../../../lib/firebase";
import './Snake.css'

const Board = () => {
  const { currentUser } = useUserStore();
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState([]);

  const currentHighScore = Number(localStorage.getItem("snakeScore"));
  

  async function handleSetScore() {
    
    try {
      await setDoc(doc(db, "highscores", currentUser.userID), {
        highScore: score,
        username: currentUser.username,
      }, { merge: true });
      console.log("High score updated successfully!");
    } catch (error) {
      console.error("Error updating high score:", error);
    }
  }

  useEffect(() => {
    const gameBoard = document.querySelector("#my-tetris");
    const context = gameBoard.getContext("2d");
    const scoreText = document.querySelector(".score");
    const resetBtn = document.querySelector(".reset");
    const highScore = document.querySelector(".high-score");
    resetBtn.style.display = "none";
    const startBtn = document.querySelector(".start");
    const gameWidth = gameBoard.width;
    const gameHeight = gameBoard.height;
    const boardBg = "black";
    const snakeColor = "aqua";
    const snakeBorder = "black";
    const foodColor = "red";

    const unitSize = 20;
    let running = false;
    let xVelocity = unitSize;
    let yVelocity = 0;

    let foodX;
    let foodY;

    let snake = [
      { x: unitSize * 2, y: 0 },
      { x: unitSize, y: 0 },
      { x: 0, y: 0 },
    ];

    const clearBoard = () => {
      context.fillStyle = boardBg;
      context.fillRect(0, 0, gameWidth, gameHeight);
    };

    const createFood = () => {
      const randomFood = (min, max) => {
        const randNum =
          Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
      };
      foodX = randomFood(0, gameWidth - unitSize);
      foodY = randomFood(0, gameHeight - unitSize);
    };

    const drawFood = () => {
      context.fillStyle = foodColor;
      context.fillRect(foodX, foodY, unitSize, unitSize);
    };

    const drawSnake = () => {
      context.fillStyle = snakeColor;
      context.strokeStyle = snakeBorder;
      snake.forEach((snakePart) => {
        context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
      });
    };

    const moveSnake = () => {
      const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity,
      };
      snake.unshift(head);

      if (snake[0].x === foodX && snake[0].y === foodY) {
        setScore((prev) => prev + 1);
        createFood();
      } else {
        snake.pop();
      }
    };

    const changeDirection = (event) => {
      const keyPressed = event.keyCode;
      const LEFT = 37;
      const UP = 38;
      const RIGHT = 39;
      const DOWN = 40;

      const goingUp = yVelocity === -unitSize;
      const goingDown = yVelocity === unitSize;
      const goingRight = xVelocity === unitSize;
      const goingLeft = xVelocity === -unitSize;

      switch (true) {
        case keyPressed === LEFT && !goingRight:
          xVelocity = -unitSize;
          yVelocity = 0;
          break;
        case keyPressed === UP && !goingDown:
          xVelocity = 0;
          yVelocity = -unitSize;
          break;
        case keyPressed === RIGHT && !goingLeft:
          xVelocity = unitSize;
          yVelocity = 0;
          break;
        case keyPressed === DOWN && !goingUp:
          xVelocity = 0;
          yVelocity = unitSize;
          break;
        default:
          break;
      }
    };

    const checkCollision = () => {
      switch (true) {
        case snake[0].x < 0:
        case snake[0].x >= gameWidth:
        case snake[0].y < 0:
        case snake[0].y >= gameHeight:
          running = false;
		  
		  
          break;
      }
      for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
          running = false;
		  
		  
        }
      }
    };

    const displayGameOver = () => {
      context.font = "50px Faster One";
      context.fillStyle = "red";
      context.textAlign = "center";
      context.fillText("Game Over", gameWidth / 2, gameHeight / 2);
      running = false;
      resetBtn.style.display = "block";
    };
	
    const resetGame = () => {
      setScore(0);
      xVelocity = unitSize;
      yVelocity = 0;
      snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 },
      ];
      gamestart();
    };

    const nextTick = () => {
      if (running) {
        setTimeout(() => {
          clearBoard();
          drawFood();
          moveSnake();
          drawSnake();
          checkCollision();
          nextTick();
        }, 75);
      } else {
        displayGameOver();
        setGameOver(true);
      }
    };

    const gamestart = () => {
      setGameOver(false);
      running = true;
      createFood();
      drawFood();
      nextTick();
      startBtn.style.display = "none";
      resetBtn.style.display = "none";
    };

    window.addEventListener("keydown", changeDirection);
    startBtn.addEventListener("click", gamestart);
    resetBtn.addEventListener("click", resetGame);
	
    return () => {
      window.removeEventListener("keydown", changeDirection);
      resetBtn.removeEventListener("click", resetGame);
	  
    };
  }, []);


  if (score > currentHighScore) {
    highScore.push(score);
    localStorage.setItem("snakeScore", JSON.stringify(score));
  }
  

  if(gameOver && highScore.pop() == currentHighScore) {
    console.log("updating high score");
    handleSetScore()

  }


  return (
    <div className="flex items-center gap-10">
      <div className="game ml-auto mt-5 flex flex-col gap-5">
        <canvas id="my-tetris" width="600" height="420"></canvas>
        <button className="start faster-one-regular m-auto w-fit rounded-xl border bg-purple-600 px-4 text-[3rem] hover:bg-white hover:text-black">
          Start
        </button>
        <button className="reset faster-one-regular m-auto w-fit rounded-xl border bg-purple-600 px-4 text-[2rem] hover:bg-white hover:text-black">
          Play Again
        </button>
      </div>

      <div className="scoreboard mr-auto h-fit w-44 rounded-xl border p-3">
        <h2 className="text-center text-2xl border-b mb-2">Score Board</h2>
        <h2  className="text-xl flex justify-between">
          High Score:{" "}
          <span className="text-2xl text-green-400 ">
            {localStorage.getItem("snakeScore")}
          </span>
        </h2>
        <h2 className="text-xl  flex justify-between">
          Current Score: <span className="text-2xl text-blue-300 ">{score}</span>
        </h2> 
      </div>
    </div>
  );
};

export default Board;
