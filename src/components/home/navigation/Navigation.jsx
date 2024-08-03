import React from "react";
import { NavLink  } from "react-router-dom";
import Logout from "../../auth/Logout";
import { useUserStore } from "../../../lib/userStore";

const Navigation = () => {
  const {currentUser} = useUserStore();
  return (
    <nav className="bg-primary">
      <ul className="flex h-12 items-center justify-center text-lg">
        <li className="hidden md:block">
          <img
            src="./assets/logo-horizontal.webp"
            alt="logo horizontal"
            className="h-12"
          />
        </li>
        <li className="h-full min-w-24 bg-primary  hover:bg-secondary border-r-2">
          <NavLink  className="flex h-12 p-2  items-center justify-center " to={"/"}>
            {" "}
            Games{" "}
          </NavLink >
        </li>
        <li className="h-full min-w-24 bg-primary  hover:bg-secondary border-r-2">
          <NavLink  className="flex h-12 p-2  items-center justify-center" to={"/leaderboard"}>
            {" "}
            Leaderboard{" "}
          </NavLink >
        </li>
        <li className="ml-auto flex items-center justify-center h-full min-w-24">
          <img src={currentUser.photoURL} alt="user photo" className="h-10 rounded-full" />
        </li>
        <li className="flex items-center justify-center h-full min-w-24 bg-red-600 p-2 hover:bg-red-700 border-l-2">
          <Logout className="h-full" />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
