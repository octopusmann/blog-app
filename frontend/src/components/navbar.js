import { ReactComponent as LightHamburgerIcon } from "../images/lightHamburgerIcon.svg";
import { ReactComponent as DarkHamburgerIcon } from "../images/darkHamburgerIcon.svg";
import { ReactComponent as LightMoonIcon } from "../images/lightMoonIcon.svg";
import { ReactComponent as DarkMoonIcon } from "../images/darkMoonIcon.svg";
import { Link } from "react-router-dom";

export default function Navbar({
  isDark,
  setIsDark,
  isIconOpen,
  setIsIconOpen,
}) {
  return (
    <nav className="flex justify-between px-4 py-4  mb-6">
      <h1 className="text-lg font-serif dark:text-white  ">Blogs` Dump</h1>
      <div className=" relative flex gap-4 ">
        {" "}
        {isDark ? (
          <LightHamburgerIcon
            onClick={() => setIsIconOpen((current) => !current)}
            className="w-6 h-6  "
          />
        ) : (
          <DarkHamburgerIcon
            onClick={() => setIsIconOpen((current) => !current)}
            className="w-6 h-6  "
          />
        )}
        {isIconOpen && (
          <div className=" absolute flex flex-col right-0 top-10 bg-white px-12 py-16 border gap-4  ">
            <Link to="/about">About</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/logout">Log out</Link>
          </div>
        )}
        {isDark ? (
          <DarkMoonIcon
            className="w-6 h-6 pr-2"
            onClick={() => setIsDark((current) => !current)}
          />
        ) : (
          <LightMoonIcon
            className="w-6 h-6 pr-2"
            onClick={() => setIsDark((current) => !current)}
          />
        )}
      </div>
    </nav>
  );
}
