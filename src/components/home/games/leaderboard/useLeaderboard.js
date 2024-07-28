import { collection, getDocs, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../../../lib/firebase";

export const useLeaderboard = () => {
  const [sortedTop5, setSortedTop5] = useState([]);
  const [sortedTetris, setSortedTetris] = useState([]);
  const [sortedSnake, setSortedSnake] = useState([]);

  const fetchHighScores = async () => {
    try {
      const userRef = collection(db, "highscores");
      const q = query(userRef);
      const querySnapshot = await getDocs(q);

      const tetrisHighScoreArray = [];
      const snakeHighScoreArray = [];
      const top5 = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const snakeHighScore = data.highScore;
        const tetrisHighScore = data.tetrisHighScore || 0;
        const totalScore = snakeHighScore + tetrisHighScore;
        const userName = doc.data().username;
        tetrisHighScoreArray.push({ userName, tetrisHighScore });
        snakeHighScoreArray.push({ userName, snakeHighScore });
        top5.push({ userName, totalScore,avatar });
      });

      const sortedTop5 = top5
        .sort((a, b) => b.totalScore - a.totalScore)
        .slice(0, 5);
      const sortedTetris = tetrisHighScoreArray
        .sort((a, b) => b.tetrisHighScore - a.tetrisHighScore)
        .slice(0, 10);
      const sortedSnake = snakeHighScoreArray
        .sort((a, b) => b.snakeHighScore - a.snakeHighScore)
        .slice(0, 10);

      setSortedTop5(sortedTop5);
      setSortedTetris(sortedTetris);
      setSortedSnake(sortedSnake);
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    fetchHighScores();
  }, []);

  return { sortedTop5, sortedTetris, sortedSnake };
};
