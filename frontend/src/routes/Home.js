import { useState } from "react";
import { fetchBlogs } from "../endpoints/api";
import { useEffect } from "react";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";

export const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [visible, setVisible] = useState(4);
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
    <div className="dark:bg-black dark:text-black pt-6 ">
      <div>
        {latestBlog && (
          <div className=" flex  flex-col   px-8 sm:px-[20%]">
            <Link to={`/blogs/${latestBlog.id}`}>
              <h2 className="text-2xl sm:text-5xl dark:text-white  font-serif ">
                {latestBlog?.title}
              </h2>
              <p className="line-clamp-5 sm:line-clamp-3 sm:w-[96%] sm:text-start text-gray-700 dark:text-gray-400 text-md font-serif my-6">
                {latestBlog?.content}
              </p>

              <img
                className="rounded-md  "
                src={`http://localhost:8000${latestBlog?.cover_image}`}
                alt="cover"
              />
            </Link>
          </div>
        )}

        <div className="flex flex-col items-start sm:px-[24%]  mt-8 sm:mt-32 px-6 ">
          {blogList.map((blog) => (
            <div key={blog.id} className="sm:flex sm:justify-between   my-4">
              <Link to={`/blogs/${blog.id}`}>
                <div>
                  <h6 className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-2">
                    {formatDate(blog.created_at)}
                  </h6>
                  <h3 className="text-base font-serif dark:text-white md:text-xl ">
                    {blog.title}
                  </h3>
                </div>
              </Link>

              <img
                className="rounded-md hidden sm:block sm:w-[27%]  lg:w-[20%]   "
                alt="cover images"
                src={`http://localhost:8000${blog?.cover_image}`}
              ></img>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 pb-4 sm:pb-8">
          {visible < blogs.length && (
            <button
              onClick={() => setVisible((prev) => prev + 3)}
              className="w-[58%] sm:w-[20%] border-2 border-gray-400 bg-cyan-300 hover:bg-cyan-500 py-2 font-serif"
            >
              View More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
