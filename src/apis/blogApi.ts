import axios from "axios";
import { Blog } from "../types/blogs";
import { baseUrl } from "../config/config";
import { getToken } from "../utils/sessionStorage";

// Create a base Axios instance without authentication
const api = axios.create({
  baseURL: `${baseUrl}/api/blogs`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create another instance for authenticated requests
const authApi = axios.create({
  baseURL: `${baseUrl}/api/blogs`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set token as Authorization header for authenticated requests
authApi.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Create a new blog post (requires authentication)
const createBlog = async (blogData: Blog) => {
  try {
    const response = await authApi.post("/", blogData);
    return response.data;
  } catch (error) {
    console.error("Error creating blog post:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message || "Failed to create blog post"
      );
    } else {
      throw new Error("Failed to create blog post");
    }
  }
};

// Get a blog post by its ID (no authentication required)
const getBlogById = async (blogId: string) => {
  try {
    const response = await authApi.get(`/${blogId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message || "Failed to fetch blog by ID"
      );
    } else {
      throw new Error("Failed to fetch blog by ID");
    }
  }
};

const getBlogBySlugId = async (slugId: string) => {
  try {
    const response = await api.get(`/slug/${slugId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog by Slug ID:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message || "Failed to fetch blog by Slug ID"
      );
    } else {
      throw new Error("Failed to fetch blog by Slug ID");
    }
  }
};

// Delete a blog post by ID (requires authentication)
const deleteBlog = async (blogId: string): Promise<void> => {
  try {
    await authApi.delete(`/${blogId}`);
  } catch (error) {
    console.error("Error deleting blog post:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message || "Failed to delete blog post"
      );
    } else {
      throw new Error("Failed to delete blog post");
    }
  }
};

// Edit an existing blog post by ID (requires authentication)
const editBlog = async (blogId: string,blogData:Blog ) => {
  try {
    const response = await authApi.put(`/${blogId}`, blogData);
    return response.data;
  } catch (error) {
    console.error("Error editing blog post:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message || "Failed to edit blog post"
      );
    } else {
      throw new Error("Failed to edit blog post");
    }
  }
};

// Get all blog posts (no authentication required)
const getVisibleBlogs = async () => {
  try {
    const response = await api.get("/visible");
    return response.data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message || "Failed to fetch blog posts"
      );
    } else {
      throw new Error("Failed to fetch blog posts");
    }
  }
};

// Toggle visibility
const toggleBlogVisibility = async (blogId: string, shouldHide: boolean) => {
  try {
    const response = await authApi.patch(`/visibility/${blogId}`, { should_hide: shouldHide });
    return response.data;
  } catch (error) {
    console.error("Error toggling blog visibility:", error);
    throw new Error("Failed to toggle blog visibility");
  }
};



const getAllBlogs = async () => {
  try {
    const response = await authApi.get("/");
    console.log(`Data are\n${response.data}`);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message || "Failed to fetch blog posts"
      );
    } else {
      throw new Error("Failed to fetch blog posts");
    }
  }
};

export {
  createBlog,
  deleteBlog,
  editBlog,
  getVisibleBlogs,
  getBlogById,
  getAllBlogs,
  toggleBlogVisibility,
  getBlogBySlugId,
};
