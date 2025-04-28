import { useState } from "react";
import { createblog } from "../endpoints/api";
import { useNavigate } from "react-router-dom";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("cover_image", coverImage);

    try {
      await createblog(formData);
      console.log("Blog created");
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };

  return (
    <div className=" flex items-center justify-center min-h-screen dark:bg-black dark:text-black">
      <form className="flex flex-col gap-4 text-start" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a blog title"
          className="border-2 rounded border-black px-4 py-2 w-80 "
        ></input>

        <textarea
          type="textarea"
          value={content}
          name="content"
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter a content"
          className="border-2 rounded border-black px-10 py-40 w-80"
        ></textarea>

        <input
          type="file"
          name="coverImage"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files[0])}
          className="dark:placeholder-white"
          required
        ></input>

        <button
          type="submit"
          className="border-2 rounded border-black px-4 py-2 w-80  dark:border-white dark:text-white"
        >
          Save
        </button>
      </form>
    </div>
  );
}
