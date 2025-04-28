import { useState } from "react";
import { useAuth } from "../contexts/useAuth";

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
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
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
