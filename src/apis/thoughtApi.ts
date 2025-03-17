import axios from "axios";
import { baseUrl } from "../config/config";
import { Thought } from "../types/thoughts";
import { getToken } from "../utils/sessionStorage";


// Create a base Axios instance without authentication
const thoughtApi = axios.create({
  baseURL: `${baseUrl}/api/thoughts`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create another instance for authenticated requests
const authThoughtApi = axios.create({
  baseURL: `${baseUrl}/api/thoughts`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set token as Authorization header for authenticated requests
authThoughtApi.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Create a new thought (requires authentication)
const createThought = async (thoughtData: Thought) => {
  try {
    const response = await authThoughtApi.post("/", thoughtData);
    return response.data;
  } catch (error) {
    console.error("Error creating thought:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message || "Failed to create thought"
      );
    } else {
      throw new Error("Failed to create thought");
    }
  }
};

// Toggle visibility
const toggleThoughtVisibility = async (thoughtId: string, shouldHide: boolean) => {
  try {
    const response = await authThoughtApi.patch(`/visibility/${thoughtId}`, { should_hide: shouldHide });
    return response.data;
  } catch (error) {
    console.error("Error toggling thought visibility:", error);
    throw new Error("Failed to toggle thought visibility");
  }
};



// Get a thought by its ID (no authentication required)
const getThoughtById = async (thoughtId: string): Promise<Thought | null> => {
  try {
    const response = await thoughtApi.get(`/${thoughtId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching thought by ID:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message || "Failed to fetch thought by ID"
      );
    } else {
      throw new Error("Failed to fetch thought by ID");
    }
  }
};

// Delete a thought by ID (requires authentication)
const deleteThought = async (thoughtId: string): Promise<void> => {
  try {
    const response = await authThoughtApi.delete(`/${thoughtId}`);
    if (response.status !== 200) {
      console.error("Failed to delete thought. Status code:", response.status);
      throw new Error("Failed to delete thought");
    }
  } catch (error) {
    console.error("Error deleting thought:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message || "Failed to delete thought"
      );
    } else {
      throw new Error("Failed to delete thought");
    }
  }
};

// Edit an existing thought by ID (requires authentication)
const editThought = async (thoughtData: Thought, thoughtId: string) => {
  try {
    const response = await authThoughtApi.put(`/${thoughtId}`, thoughtData);
    return response.data;
  } catch (error) {
    console.error("Error editing thought:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || "Failed to edit thought");
    } else {
      throw new Error("Failed to edit thought");
    }
  }
};

// Get all public thoughts
const getVisibleThoughts = async () => {
  try {
    const response = await thoughtApi.get("/visible");
    return response.data;
  } catch (error) {
    console.error("Error fetching thoughts:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message || "Failed to fetch thoughts"
      );
    } else {
      throw new Error("Failed to fetch thoughts");
    }
  }
};

// Get all thoughts
const getAllThoughts = async () => {
  try {
    const response = await authThoughtApi.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching thoughts:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message || "Failed to fetch thoughts"
      );
    } else {
      throw new Error("Failed to fetch thoughts");
    }
  }
};

export {
  createThought,
  deleteThought,
  editThought,
  getAllThoughts,
  getThoughtById,
  getVisibleThoughts,
  toggleThoughtVisibility,
};