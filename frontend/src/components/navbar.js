import { ReactComponent as LightHamburgerIcon } from "../images/lightHamburgerIcon.svg";
import { ReactComponent as DarkHamburgerIcon } from "../images/darkHamburgerIcon.svg";
import { ReactComponent as LightMoonIcon } from "../images/lightMoonIcon.svg";
import { ReactComponent as DarkMoonIcon } from "../images/darkMoonIcon.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { useTheme } from "../contexts/ThemeMode";
import { useNavbar } from "../contexts/NavbarContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const { isDark, toggleDarkMode } = useTheme();
  const { isIconOpen, setIsIconOpen, handleLogout } = useNavbar();
  const navigate = useNavigate();

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsIconOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsIconOpen]);

  return (
    <nav className="relative bg-white dark:bg-black sm:pt-4 sm:pr-[5%] sm:pb-20  ">
      <div className="flex justify-between sm:justify-normal  items-center px-4 pt-4 pb-4 bg-white dark:bg-black">
        <div className="w-full max-w-3xl">
          <h1
            className="text-lg sm:text-xl font-serif dark:text-white cursor-pointer sm:mx-[20%]"
            onClick={() => navigate("/")}
          >
            Blogs` Dump
          </h1>
        </div>
        <div className="flex gap-4 " ref={menuRef}>
          <div className="sm:hidden">
            {" "}
            {isDark ? (
              <LightHamburgerIcon
                onClick={() => setIsIconOpen((current) => !current)}
                className={`w-4 h-6 cursor-pointer transition-transform duration-300 ${
                  isIconOpen ? "rotate-180" : ""
                }`}
              />
            ) : (
              <DarkHamburgerIcon
                onClick={() => setIsIconOpen((current) => !current)}
                className={`w-4 h-6 cursor-pointer transition-transform duration-300 ${
                  isIconOpen ? "rotate-180" : ""
                }`}
              />
            )}
            {isIconOpen && (
              <div className=" absolute flex flex-col   left-4 right-4 top-full bg-lime-100 dark:bg-gray-800 text-black dark:text-white text-start  py-10 border-2 rounded-md  border-gray-400 dark:border-white gap-4   ">
                <Link
                  className="px-4 py-2 rounded-md  text-lg hover:bg-stone-400 dark:hover:bg-blue-500"
                  onClick={() => setIsIconOpen(false)}
                  to="/about"
                >
                  About
                </Link>
                {!isAuthenticated && (
                  <Link
                    className="px-4 py-2 rounded-md text-lg hover:bg-stone-400 dark:hover:bg-blue-500"
                    to="/login"
                    onClick={() => setIsIconOpen(false)}
                  >
                    Login
                  </Link>
                )}
                {!isAuthenticated && (
                  <Link
                    className="px-4 py-2 rounded-md text-lg focus:bg-blue-500 focus:text-white hover:bg-stone-400 dark:hover:bg-blue-500"
                    to="/register"
                    onClick={() => setIsIconOpen(false)}
                  >
                    Register
                  </Link>
                )}
                {isAuthenticated && (
                  <Link
                    to="/create"
                    className="px-4 py-2 rounded-md text-lg focus:bg-blue-500 focus:text-white hover:bg-stone-400 dark:hover:bg-blue-500"
                    onClick={() => setIsIconOpen(false)}
                  >
                    {" "}
                    Create a Blog
                  </Link>
                )}
                {isAuthenticated && (
                  <Link
                    className="px-4 py-2 rounded-md text-lg  focus:bg-blue-500 focus:text-white hover:bg-stone-400 dark:hover:bg-blue-500"
                    to="#"
                    onClick={() => handleLogout()}
                  >
                    Log out
                  </Link>
                )}
              </div>
            )}
          </div>
          <div className="hidden sm:flex items-center lg:pl-36 gap-6 text-black dark:text-white ">
            <Link
              className="px-4 py-2 rounded-md md:rounded-full  text-lg hover:bg-stone-400 dark:hover:bg-blue-500"
              onClick={() => setIsIconOpen(false)}
              to="/about"
            >
              About
            </Link>

            {!isAuthenticated && (
              <Link
                className="px-4 py-2 rounded-md md:rounded-full text-lg hover:bg-stone-400 dark:hover:bg-blue-500"
                to="/login"
                onClick={() => setIsIconOpen(false)}
              >
                Login
              </Link>
            )}
            {!isAuthenticated && (
              <Link
                className="px-4 py-2 rounded-md md:rounded-full text-lg focus:bg-blue-500 focus:text-white hover:bg-stone-400 dark:hover:bg-blue-500"
                to="/register"
                onClick={() => setIsIconOpen(false)}
              >
                Register
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/create"
                className="px-4 py-2 rounded-md md:rounded-full text-lg focus:bg-blue-500 focus:text-white hover:bg-stone-400 dark:hover:bg-blue-500"
                onClick={() => setIsIconOpen(false)}
              >
                {" "}
                Create a Blog
              </Link>
            )}
            {isAuthenticated && (
              <Link
                className="px-4 py-2 rounded-md md:rounded-full text-lg  focus:bg-blue-500 focus:text-white hover:bg-stone-400 dark:hover:bg-blue-500"
                to="#"
                onClick={() => handleLogout()}
              >
                Log out
              </Link>
            )}
            <div className="hidden sm:block">
              {isDark ? (
                <DarkMoonIcon
                  className="w-6 h-6   pr-2"
                  onClick={toggleDarkMode}
                />
              ) : (
                <LightMoonIcon
                  className="w-6 h-6 pr-2"
                  onClick={toggleDarkMode}
                />
              )}
            </div>
          </div>

          <div className=" sm:hidden block">
            {isDark ? (
              <DarkMoonIcon
                className="w-6 h-6   pr-2"
                onClick={toggleDarkMode}
              />
            ) : (
              <LightMoonIcon
                className="w-6 h-6 pr-2"
                onClick={toggleDarkMode}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
