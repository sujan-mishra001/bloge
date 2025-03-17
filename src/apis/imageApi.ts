import axios from "axios";
import { baseUrl } from "../config/config";
import { getToken } from "../utils/sessionStorage";

// Create a reusable Axios instance for image uploads
const imageApi = axios.create({
  baseURL: `${baseUrl}/api/images`, 
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Set token as Authorization header if it exists
imageApi.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Upload an image file
const uploadImage = async (imageFile: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);
    const response = await imageApi.post("/upload-image", formData); 
    const data = await response.data;
    return data.url; // Make sure the response returns `url` as in the controller
  } catch (error) {
    console.error("Error uploading image:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to upload image");
    } else {
      throw new Error("Failed to upload image");
    }
  }
};

export { uploadImage };
