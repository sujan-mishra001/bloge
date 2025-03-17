import { useState } from "react";
import DOMPurify from "dompurify";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../apis/auth";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";


type AdminProps = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [adminProps, setAdminProps] = useState<AdminProps>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handleLogin = async () => {
    setLoading(true);
    try {
      const sanitizedEmail = DOMPurify.sanitize(adminProps.email);
      const sanitizedPassword = DOMPurify.sanitize(adminProps.password);

      const data = await adminLogin(sanitizedEmail, sanitizedPassword);
      if (data.success) {
        const { token, user } = data;
        toast.success("Login successful! Redirecting to the dashboard...");
        dispatch(login({ token, user }));
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminProps((prev) => ({
      ...prev,
      [name]: DOMPurify.sanitize(value),
    }));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bg dark:bg-bg-dark font-nunito">
      <div className="w-full max-w-md p-8 space-y-6 bg-bg/70 dark:bg-bg-dark/5 border-accent dark:border-accent-dark border-2 rounded-xl shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-title dark:text-title-dark">Welcome Back</h1>
          <p className="text-sm text-accent dark:text-accent-dark">
            Please enter your credentials to continue.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-text dark:text-text-dark">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              disabled={loading}
              value={adminProps.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg bg-bg dark:bg-bg-dark text-text dark:text-text-dark border-accent dark:border-accent-dark 
                       placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-accent focus:border-accent
                       disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="name@mail.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-text dark:text-text-dark">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              disabled={loading}
              value={adminProps.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg bg-bg dark:bg-bg-dark text-text dark:text-text-dark border-accent dark:border-accent-dark 
                       placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-accent focus:border-accent
                       disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full px-4 py-2 text-sm font-medium text-white dark:text-black bg-black dark:bg-white rounded-lg
                     focus:outline-none focus:ring-2
                     focus:ring-offset-2 disabled:opacity-50
                     disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <span>{loading ? "Signing in..." : "Sign in"}</span>
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginPage;
