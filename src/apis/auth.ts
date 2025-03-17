import axios from "axios";
import { baseUrl } from "../config/config";

const loginEndpoint = `${baseUrl}/api/admin/login`;

const adminLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(loginEndpoint, { email, password });
    
    if (response.status === 200 && response.data.token) {
      return { success: true, ...response.data };
    } else {
      console.error("Login failed: Token not received.");
      return { success: false, message: "Login failed. Please try again." };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          return { success: false, message: "Invalid email or password." };
        } else if (status === 401) {
          return { success: false, message: "Unauthorized access. Check your credentials." };
        } else if (status === 500) {
          return { success: false, message: "Internal server error. Please try again later." };
        } else {
          return { success: false, message: `Error: ${error.response.data?.message || "Unexpected error occurred."}` };
        }
      } else if (error.request) {
        return { success: false, message: "Network error. Please check your connection." };
      }
    }
    console.error("Unexpected error during login:", error);
    return { success: false, message: "An unexpected error occurred. Please try again later." };
  }
};

export { adminLogin };
