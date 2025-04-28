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
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 rounded border-black px-4 py-2 w-32 "
          placeholder="Email"
        ></input>

        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="border-2 rounded border-black px-4 py-2 w-32 "
        ></input>

        <input
          type="password"
          name="password"
          value={rePassword}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border-2 rounded border-black px-4 py-2 w-32 "
        ></input>

        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setRePassword(e.target.value)}
          placeholder="Enter password again"
          className="border-2 rounded border-black px-4 py-2 w-32 "
        ></input>
        <button
          type="submit"
          className="border-2 rounded border-red-600 px-4 py-2 w-32 "
        >
          Log In
        </button>
      </form>
    </div>
  );
}
