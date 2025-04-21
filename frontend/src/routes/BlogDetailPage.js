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
    <div>
      <h1 className="mb-10">{blog.title}</h1>
      <img src={`http://localhost:8000${blog?.cover_image}`} alt="cover" />
      <p>{blog.content}</p>
    </div>
  );
}
