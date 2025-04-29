import { useState } from "react";
import { login } from "../endpoints/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };
  return (
    <div className=" flex items-center justify-center min-h-screen dark:bg-black  dark:text-white">
      <div className=" bg-gray-800 w-full max-w-sm md:max-w-md lg:max-w-lg mx-6 py-8  rounded-lg gap-y-2">
        {" "}
        <h1 className="text-black dark:text-white text-start pb-6 pl-[10%]  text-xl font-bold">
          {" "}
          Sign Up
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <label className="w-[80%] pb-2 text-md font-semibold">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" bg-gray-600 border border-gray-600 rounded-lg px-4 py-3 w-[80%]"
              placeholder="Email"
            ></input>
          </div>

          <div className="flex flex-col items-center">
            <label className="w-[80%] pb-2 text-md font-semibold">
              Username
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
            <label className="w-[80%] pb-2 text-md font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={rePassword}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              c
              className=" bg-gray-600 border border-gray-600 rounded-lg px-4 py-3 w-[80%]"
            ></input>
          </div>

          <div className="flex flex-col items-center">
            <label className="w-[80%] pb-2 text-md font-semibold">
              Confirm New Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setRePassword(e.target.value)}
              placeholder="Enter password again"
              className=" bg-gray-600 border border-gray-600 rounded-lg px-4 py-3 w-[80%]"
            ></input>
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className=" bg-blue-600 border-blue-600 border-2 rounded-lg px-32 py-2 w-[80%] mt-8 "
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
