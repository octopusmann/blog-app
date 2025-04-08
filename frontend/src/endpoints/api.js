import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";
const BLOGS_LIST_URL = `${BASE_URL}/blogs/`;
// const getBlogDetailUrl = (id) => `${BASE_URL}/blogs/${id}/`;

export const fetchBlogs = async () => {
  const response = await axios.get(BLOGS_LIST_URL);

  console.log(response.data);
  return response.data;
};
