// import { ReactComponent as LightHamburgerIcon } from "../images/lightHamburgerIcon.svg";
// import { ReactComponent as LightDarkModeIcon } from "../images/lightDarkModeIcon.svg";
import { ReactComponent as LightHamburgerIcon } from "../images/lightHamburgerIcon.svg";
import { ReactComponent as DarkHamburgerIcon } from "../images/darkHamburgerIcon.svg";
import { ReactComponent as LightMoonIcon } from "../images/lightMoonIcon.svg";
import { ReactComponent as DarkMoonIcon } from "../images/darkMoonIcon.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../endpoints/api";
import { useEffect } from "react";
import { formatDate } from "../utils/formatDate";

export const Home = () => {
  const [isIconOpen, setIsIconOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [visible, setVisible] = useState(4);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const call = async () => {
      const data = await fetchBlogs();
      setBlogs(data);
    };

    call();

    console.log(blogs);
  }, [blogs]);

  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    const preferMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (savedMode || (!savedMode && preferMode)) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const latestBlog = blogs[0];
  const blogList = blogs.slice(1, visible);

  return (
    <div className="dark:bg-black dark:text-black">
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

      <div>
        {latestBlog && (
          <div className=" flex  flex-col px-6 ">
            <h2 className="text-2xl dark:text-white  font-serif ">
              {blogs[0]?.title}
            </h2>
            <p className="line-clamp-5 text-gray-700 dark:text-gray-400 text-md font-serif my-6">
              {latestBlog?.content}
            </p>
            <img
              className="rounded-md"
              src={`http://localhost:8000${latestBlog?.cover_image}`}
              alt="cover"
            />
          </div>
        )}

        <div className="flex flex-col items-start mt-8 px-6 ">
          {blogList.map((blog) => (
            <div key={blog.id} className="my-4">
              <h6 className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-2">
                {formatDate(blog.created_at)}
              </h6>
              <h3 className="text-base font-serif dark:text-white ">
                {blog.title}
              </h3>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 ">
          {visible < blogs.length && (
            <button
              onClick={() => setVisible((prev) => prev + 3)}
              className="w-[58%]  border-2 border-gray-400 bg-cyan-300 hover:bg-cyan-500 py-2 font-serif"
            >
              View More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
