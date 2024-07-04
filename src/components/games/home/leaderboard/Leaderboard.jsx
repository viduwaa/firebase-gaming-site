import { collection, getDocs, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../../../lib/firebase";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  const fetchHighScores = async () => {
    try {
      const userRef = collection(db, "users");
      const q = query(userRef);

      const querySnapshot = await getDocs(q);

      const users = [];

      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });

      users.sort((a, b) => b.highScore - a.highScore);

      return users;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    const getHighScores = async () => {
      const fetchedUsers = await fetchHighScores();
      setUsers(fetchedUsers);
    };

    getHighScores();
  }, []);

  return (
    <div className="mt-3">
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      <table className="text-center w-4/5">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>High Score</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.highScore}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
