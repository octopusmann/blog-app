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
    <div className="dark:bg-black dark:text-black pt-6">
      <div>
        {latestBlog && (
          <div className=" flex  flex-col px-8 ">
            <Link to={`/blogs/${latestBlog.id}`}>
              <h2 className="text-2xl dark:text-white  font-serif ">
                {latestBlog?.title}
              </h2>
            </Link>
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
              <Link to={`/blogs/${blog.id}`}>
                <h3 className="text-base font-serif dark:text-white ">
                  {blog.title}
                </h3>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 ">
          {visible < blogs.length && (
            <button
              onClick={() => setVisible((prev) => prev + 3)}
              className="w-[58%] border-2 border-gray-400 bg-cyan-300 hover:bg-cyan-500 py-2 font-serif"
            >
              View More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
