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
    <div className=" dark:bg-black  dark:text-white flex flex-col px-6 py-20">
      <h1 className="text-3xl font-serif mb-10">{blog.title}</h1>
      <img
        className="rounded-md  "
        src={`http://localhost:8000${blog?.cover_image}`}
        alt="cover"
      />
      <p className="mt-8 whitespace-pre-line dark:text-gray-300">
        {blog.content}
      </p>
    </div>
  );
}
