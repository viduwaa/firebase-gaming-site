import React from "react";
import { useUserStore } from "../../../lib/userStore";
import games from "../../../helpers/games";
import { Link } from "react-router-dom";
import Snake from "./snake/Snake";

const Home = () => {
  const { currentUser } = useUserStore();

  const GameCard = ({ games }) => {
    return games.map((game) => (
      <div
        className="card relative mt-3 flex h-[320px] w-[280px] flex-col items-center justify-center rounded-lg border"
        key={game.id}
      >
        <div
          style={{ backgroundImage: `url(${game.photo})` }}
          className={`header flex h-full w-full items-center justify-center bg-cover`}
        ></div>
        <Link to={"/snake"} className="text-shadow absolute flex w-32 items-center justify-center rounded-md border bg-[#7bc8ff65] p-4 backdrop-blur-sm hover:bg-[#7bc8fff6] hover:backdrop:blur-none">
          <button>PLAY</button>
        </Link>
        <div className="body h-32">
          <h1 className="text-shadow text-center font-serif text-3xl backdrop-blur-sm">
            {game.name}
          </h1>
          <p>{game.description}</p>
        </div>
      </div>
    ));
  };

  return (
    <main className="mt-3">
      <div className="welcome">
        <h1>Welcome {currentUser.username}</h1>
      </div>
      <div className="flex flex-wrap gap-5">
        <GameCard games={games} />
      </div>
    </main>
  );
};

export default Home;
