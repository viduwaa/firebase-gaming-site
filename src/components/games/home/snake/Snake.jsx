import React, { useEffect, useRef, useState } from "react"
import "./Snake.css"
import AppleLogo from "../../../../assets/applePixels.png"
import { doc, setDoc, updateDoc } from "firebase/firestore";
import useInterval from "./useInterval"
import { useUserStore } from "../../../../lib/userStore"
import { db } from "../../../../lib/firebase";

const canvasX = 1000
const canvasY = 1000
const initialSnake = [ [ 4, 10 ], [ 4, 10 ] ]
const initialApple = [ 14, 10 ]
const scale = 50
const timeDelay = 100

function Snake() {
	const canvasRef = useRef(null)
	const [ snake, setSnake ] = useState(initialSnake)
	const [ apple, setApple ] = useState(initialApple)
	const [ direction, setDirection ] = useState([ 0, -1 ])
	const [ delay, setDelay ] = useState(null)
	const [ gameOver, setGameOver ] = useState(false)
	const [ score, setScore ] = useState(0)

  const { currentUser } = useUserStore();

	useInterval(() => runGame(), delay)

	useEffect(
		() => {
			let fruit = document.getElementById("fruit") 
			if (canvasRef.current) {
				const canvas = canvasRef.current
				const ctx = canvas.getContext("2d")
				if (ctx) {
					ctx.setTransform(scale, 0, 0, scale, 0, 0)
					ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
					ctx.fillStyle = "#a3d001"
					snake.forEach(([ x, y ]) => ctx.fillRect(x, y, 1, 1))
					ctx.drawImage(fruit, apple[0], apple[1], 1, 1)
				}
			}
		},
		[ snake, apple, gameOver ]
	)

	async function handleSetScore() {
    try {
      const currentHighScore = Number(localStorage.getItem("snakeScore"));
      if (score > currentHighScore) {
        // Update local storage
        localStorage.setItem("snakeScore", JSON.stringify(score));
  
        // Reference to the Firestore user document
        await setDoc(doc(db, "highscores", currentUser.userID), {
			highScore: score,
			username : currentUser.username
		});
        console.log("High score updated successfully!");
      }
    } catch (error) {
      console.error("Error updating high score:", error);
    }
  }

	function play() {
		setSnake(initialSnake)
		setApple(initialApple)
		setDirection([ 1, 0 ])
		setDelay(timeDelay)
		setScore(0)
		setGameOver(false)
	}

	function checkCollision(head) {
		for (let i = 0; i < head.length; i++) {
			if (head[i] < 0 || head[i] * scale >= canvasX) return true
		}
		for (const s of snake) {
			if (head[0] === s[0] && head[1] === s[1]) return true
		}
		return false
	}

	function appleAte(newSnake) {
		let coord = apple.map(() => Math.floor(Math.random() * canvasX / scale))
		if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
			let newApple = coord
			setScore(score + 1)
			setApple(newApple)
			return true
		}
		return false
	}

	function runGame() {
		const newSnake = [ ...snake ]
		const newSnakeHead = [ newSnake[0][0] + direction[0], newSnake[0][1] + direction[1] ]
		newSnake.unshift(newSnakeHead)
		if (checkCollision(newSnakeHead)) {
			setDelay(null)
			setGameOver(true)
			handleSetScore()
		}
		if (!appleAte(newSnake)) {
			newSnake.pop()
		}
		setSnake(newSnake)
	}

	function changeDirection(e) {
		switch (e.key) {
			case "ArrowLeft":
				setDirection([ -1, 0 ])
				break
			case "ArrowUp":
				setDirection([ 0, -1 ])
				break
			case "ArrowRight":
				setDirection([ 1, 0 ])
				break
			case "ArrowDown":
				setDirection([ 0, 1 ])
				break
		}
	}

	return (
    <>

		<div onKeyDown={(e) => changeDirection(e)}>
			<img id="fruit" src={AppleLogo} alt="fruit" width="30" />
			<canvas className="playArea border border-white" ref={canvasRef} width={`${canvasX}px`} height={`${canvasY}px`} />
			{gameOver && <div className="gameOver">Game Over</div>}
			<button onClick={play} className="playButton">
				Play
			</button>
			<div className="scoreBox">
				<h2>Score: {score}</h2>
				<h2>High Score: {localStorage.getItem("snakeScore")}</h2>
			</div>
		</div></>
	)
}

export default Snake