import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";
const BLOGS_LIST_URL = `${BASE_URL}/blogs/`;
const getDetailUrl = (id) => `${BLOGS_LIST_URL}${id}/`;
const LOGIN_URL = `${BASE_URL}/auth/token/`;
const REGISTER_URL = `${BASE_URL}/auth/register/`;
const REFRESHED_URL = `${BASE_URL}/auth/token/refresh/`;
const LOGOUT_URL = `${BASE_URL}/auth/logout/`;
const AUTH_URL = `${BASE_URL}/auth/authenticated/`;
const CURRENT_USER_URL = `${BASE_URL}/auth/user/`;

export const fetchBlogs = async () => {
  const response = await axios.get(BLOGS_LIST_URL);

  console.log(response.data);
  return response.data;
};

export const fetchBlogDetails = async (id) => {
  try {
    const response = await axios.get(getDetailUrl(id));
    console.log("Inside API file - blog fetched:", response.data);
    return response.data;
  } catch (error) {
    console.log("API Error: ", error.message, error.response?.data);
  }
};

export const editBlogDetails = async (id, updatedData) => {
  try {
    const response = await axios.patch(getDetailUrl(id), updatedData, {
      withCredentials: true,
      headers: { "Content-type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.log("Edit Error:", error.message, error.response?.data);
  }
};

export const deleteBlogDetails = async (id) => {
  try {
    const response = await axios.delete(getDetailUrl(id), {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Delete Error:", error.message, error.response?.data);
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(
      LOGIN_URL,
      { username: username, password: password },
      { withCredentials: true }
    );
    console.log("Login success:", response.data);

    return true;
  } catch (error) {
    console.error("Login failed", error.response?.data);
    return error;
  }
};

export const register = async (username, password, email) => {
  try {
    const response = await axios.post(REGISTER_URL, {
      username,
      password,
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Register API Error:", error.response?.data);
    throw error;
  }
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

export const is_authenticated = async () => {
  try {
    const response = await axios.post(
      AUTH_URL,
      {},
      {
        withCredentials: true,
      }
    );
    return true;
  } catch (error) {
    return false;
  }
};

export const createblog = async (formData) => {
  try {
    const response = await axios.post(BLOGS_LIST_URL, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return call_refresh(error, () =>
      axios.post(BLOGS_LIST_URL, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  }
};

export const getCurrentUser = async (id) => {
  try {
    const response = await axios.get(CURRENT_USER_URL, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const refresh_token = async () => {
  const response = await axios.post(
    REFRESHED_URL,
    {},
    { withCredentials: true }
  );

  return response.data.success;
};

const call_refresh = async (error, func) => {
  if (error.response && error.response.status === 401) {
    const tokenRefreshed = await refresh_token();

    if (tokenRefreshed) {
      const retryResponse = await func();
      return retryResponse.data;
    }
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      LOGOUT_URL,
      {},
      { withCredentials: true }
    );
    return true;
  } catch (error) {
    return false;
  }
};
