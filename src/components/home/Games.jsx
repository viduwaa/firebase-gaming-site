import React from "react";
import Logout from "../auth/Logout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./games/Home";
import NoPage from "./games/noPage/NoPage";
import Snake from "./games/snake/Snake";
import Navigation from "./navigation/Navigation";
import Login from "../auth/Login";
import Leaderboard from "./games/leaderboard/Leaderboard";
import { FaGithub } from "react-icons/fa";
import Tetris from "./games/tetris/Tetris";

const Games = () => {
  return (
    <>
      <BrowserRouter>
        <div className="relative m-auto h-dvh w-full md:w-4/5">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/snake" element={<Snake />} />
            <Route path="/tetris" element={<Tetris />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
          <div className="absolute bottom-0 w-full bg-secondary text-center text-lg text-yellow-300">
            <h1 className="flex items-center justify-center gap-5">
              Still under development, Have Fun !!, Source code: {" "}
              <a href="https://github.com/viduwaa/firebase-gaming-site">
                <FaGithub color="red" />
              </a>
            </h1>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default Games;
