import { ReactComponent as HamburgerIcon } from "../images/HamburgerIcon.svg";
import { ReactComponent as DarkModeIcon } from "../images/DarkModeIcon.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../endpoints/api";
import { useEffect } from "react";
export const Home = () => {
  const [isIconOpen, setIsIconOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [visible, setVisible] = useState(4);
  // const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const call = async () => {
      const data = await fetchBlogs();
      setBlogs(data);
    };

    call();

    console.log(blogs);
  }, []);

  const latestBlog = blogs[0];
  const blogList = blogs.slice(1, visible);

  return (
    <div>
      <div className="flex justify-between items-center pt-2">
        <h1>Blogs` Dump</h1>
        <div className=" flex gap-4 ">
          {" "}
          <HamburgerIcon
            onClick={() => setIsIconOpen((current) => !current)}
            className="w-6 h-6  "
          />
          <DarkModeIcon className="w-6 h-6 pr-2" />
          {isIconOpen && (
            <div className="flex flex-col gap-4">
              <Link to="/about">About</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>
      </div>

      <div>
        {latestBlog && (
          <div>
            <h2 className="">{blogs[0]?.title}</h2>
            <p className="line-clamp-3">{latestBlog?.content}</p>
            <img
              src={`http://localhost:8000${latestBlog?.cover_image}`}
              alt="cover"
            />
          </div>
        )}

        <div>
          {blogList.map((blog) => (
            <div key={blog.id}>
              <h3>{blog.title}</h3>
              <p className="line-clamp-2">{blog.content}</p>
            </div>
          ))}
        </div>
        {visible < blogs.length && (
          <button
            onClick={() => setVisible((prev) => prev + 3)}
            className="border-2 border-black p-4"
          >
            View More
          </button>
        )}
      </div>
    </div>
  );
};
