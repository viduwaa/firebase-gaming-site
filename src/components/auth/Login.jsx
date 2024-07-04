import React from "react";
import GoogleLogin from "./signWithGoogle/GoogleLogin";
import { Link } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";

const Login = () => {
  return (
    <>
      <div className="m-auto mt-32 flex w-1/4 min-w-72 flex-col items-center justify-center gap-5 rounded-lg border border-primary bg-primary p-5">
        <img
          src="/assets/logo.webp"
          alt="logo"
          className="h-56 w-56 rounded-full shadow-2xl border-black border"
        />
        <h1 className="text-shadow text-center text-2xl font-bold">
          Welcome to Malkoha Gaming
        </h1>
        <GoogleLogin />
      </div>
      <div className="absolute top-0 m-3 w-fit rounded-md bg-primary p-2">
        <a href="https://malkoha.site" className="flex items-center gap-2">
          <IoArrowBackCircle />
          <p> Back to Malkoha</p>
        </a>
      </div>
    </>
  );
};

export default Login;
