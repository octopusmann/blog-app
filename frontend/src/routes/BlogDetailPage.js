import { useEffect, useState } from "react";
import {
  editBlogDetails,
  fetchBlogDetails,
  deleteBlogDetails,
  getCurrentUser,
} from "../endpoints/api";
import { useNavigate, useParams } from "react-router-dom";
export default function BlogDetailPage() {
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [updateText, setUpdateText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const call = async () => {
      try {
        console.log("Calling API with ID:", id);
        const data = await fetchBlogDetails(id);
        console.log("Fetched blog data:", data);
        setBlog(data);
        setTitle(data.title);
        setUpdateText(data.content);

        const user = await getCurrentUser();
        setCurrentUserId(user?.id);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };

    call();
  }, [id]);

  const isOwner = currentUserId === blog?.owner;

  if (!blog) return <div>Loading...</div>;

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", updateText);
    if (coverImage) {
      formData.append("cover_image", coverImage);
    }

    const updatedData = await editBlogDetails(id, formData);
    if (updatedData) {
      setBlog(updatedData);
      setIsEditing(false);
      console.log("UPDATED:", updatedData);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (confirm) {
      await deleteBlogDetails(id);
      navigate("/");
    }
  };
  return (
    <div className="w-full  overflow-x-hidden">
      <div className=" dark:bg-black  dark:text-white flex flex-col sm:items-center sm:justify-center  px-4 sm:px-6 lg:px-12 py-20">
        <div className="w-full max-w-3xl">
          {isEditing ? (
            <>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-3xl font-serif mb-6 bg-transparent border p-2 dark:text-white"
              />
              <div className="w-full mb-6">
                <img
                  src={`http://localhost:8000${blog?.cover_image}`}
                  alt="preview"
                  className="w-full object-cover rounded-2xl"
                />
              </div>
              <textarea
                value={updateText}
                onChange={(e) => setUpdateText(e.target.value)}
                className="w-full h-48 p-2 bg-transparent border dark:text-white"
              />
              <input
                type="file"
                onChange={(e) => setCoverImage(e.target.files[0])}
                className="mt-4"
              />
              <div className="mt-4 flex gap-4">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-serif mb-10">{blog.title}</h1>
              <img
                className="w-full object-cover rounded-2xl mb-8"
                src={`http://localhost:8000${blog?.cover_image}`}
                alt="cover"
              />
              <p className="whitespace-pre-line dark:text-gray-300">
                {blog.content}
              </p>
              {isOwner && (
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
