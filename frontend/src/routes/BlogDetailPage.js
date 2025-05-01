import { useEffect, useState } from "react";
import { fetchBlogDetails } from "../endpoints/api";
import { useParams } from "react-router-dom";
export default function BlogDetailPage() {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const call = async () => {
      try {
        console.log("Calling API with ID:", id);
        const data = await fetchBlogDetails(id);
        console.log("Fetched blog data:", data);
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };

    call();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="w-full  overflow-x-hidden">
      <div className=" dark:bg-black  dark:text-white flex flex-col sm:items-center sm:justify-center  px-4 sm:px-6 lg:px-12 py-20">
        <div className="w-full max-w-3xl">
          <h1 className="text-3xl sm:text-start font-serif mb-10">
            {blog.title}
          </h1>
          <div className="w-full mb-8">
            <img
              className="w-full object-cover rounded-2xl "
              src={`http://localhost:8000${blog?.cover_image}`}
              alt="cover"
            />
          </div>
        </div>
        <div className="w-full max-w-3xl ">
          <p className="mt-8 whitespace-pre-line dark:text-gray-300">
            {blog.content}
          </p>
        </div>
      </div>
    </div>
  );
}
