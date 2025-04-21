import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";
const BLOGS_LIST_URL = `${BASE_URL}/blogs/`;
const getDetailUrl = (id) => `${BLOGS_LIST_URL}${id}/`;

export const fetchBlogs = async () => {
  const response = await axios.get(BLOGS_LIST_URL);

  console.log(response.data);
  return response.data;
};

export const fetchBlogDetails = async (id) => {
  try {
    const response = await axios.get(getDetailUrl(id));
    console.log("Inside API file - blog fetched:", response.data);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("API Error: ", error.message, error.response?.data);
  }
};
