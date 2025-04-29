import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login_user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login_user(username, password);
  };
  return (
    <div className=" flex items-center justify-center min-h-screen bg-white  dark:bg-black  dark:text-white">
      <div className=" bg-gray-800 w-full max-w-sm md:max-w-md lg:max-w-lg mx-6 py-8  rounded-lg gap-y-2">
        <h1 className="text-black dark:text-white text-start pb-6 pl-[10%]  text-xl font-bold">
          {" "}
          Sign in to your account
        </h1>
        <form className="gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <label className="w-[80%] pb-2 text-md font-semibold">
              Your Email
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className=" bg-gray-600 border border-gray-600 rounded-lg px-4 py-3 w-[80%]"
            ></input>
          </div>
          <div className="flex flex-col items-center">
            <label className="w-[80%] pb-2 text-md pt-4 font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className=" bg-gray-600 border border-gray-700 rounded-lg px-4 py-3 w-[80%]"
            ></input>
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className=" bg-blue-600 border-blue-600 border-2 rounded-lg px-32 py-2 w-[80%] mt-8 "
            >
              {" "}
              Log In
            </button>
          </div>
          <div className="flex flex-col items-start pl-[10%] pt-4">
            <p className=" text-gray-400">
              {" "}
              Don’t have an account yet?{" "}
              <Link to="/register" className="text-blue-400 pl-1">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
