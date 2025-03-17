import { useEffect, useState } from "react";
import { ThoughtPost } from "../../types/thoughts";
import { BlogPost } from "../../types/blogs";
import {
  deleteBlog,
  getAllBlogs,
  toggleBlogVisibility,
} from "../../apis/blogApi";
import {
  deleteThought,
  getAllThoughts,
  toggleThoughtVisibility,
} from "../../apis/thoughtApi";
import { Edit, Trash2, Eye, EyeOff, Plus, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import ThemeToggle from "../../components/theme/ThemeToggle";
import { getUser } from "../../utils/sessionStorage";

export default function Dashboard() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [thoughts, setThoughts] = useState<ThoughtPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = getUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsData = await getAllBlogs();
        const thoughtsData = await getAllThoughts();
        setBlogs(blogsData);
        setThoughts(thoughtsData);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleVisibility = async (id: string, type: "blog" | "thought") => {
    if (type === "blog") {
      const blog = blogs.find((b) => b.blog_id === id);
      if (!blog) return;

      try {
        await toggleBlogVisibility(id, !blog.should_hide);
        setBlogs((prevBlogs) =>
          prevBlogs.map((b) =>
            b.blog_id === id ? { ...b, should_hide: !b.should_hide } : b
          )
        );
        toast.success(`Blog ${blog.should_hide ? "Visible" : "Hidden"}!`);
      } catch (error) {
        toast.error("Failed to update blog visibility.");
      }
    } else {
      const thought = thoughts.find((t) => t.thought_id === id);
      if (!thought) return;

      try {
        await toggleThoughtVisibility(id, !thought.should_hide);
        setThoughts((prevThoughts) =>
          prevThoughts.map((t) =>
            t.thought_id === id ? { ...t, should_hide: !t.should_hide } : t
          )
        );
        toast.success(`Thought ${thought.should_hide ? "Visible" : "Hidden"}!`);
      } catch (error) {
        toast.error("Failed to update thought visibility.");
      }
    }
  };

  const handleDelete = async (id: string, type: "blog" | "thought") => {
    if (type === "blog") {
      try {
        await deleteBlog(id);
        setBlogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog.blog_id !== id)
        );
        toast.success("Blog deleted successfully!");
      } catch (error) {
        toast.error(`${error}`);
      }
    } else {
      await deleteThought(id);
      setThoughts((prevThoughts) =>
        prevThoughts.filter((thought) => thought.thought_id !== id)
      );
      toast.success("Thought deleted successfully!");
    }
  };

  const handleEdit = (blog_id: string) => {
    navigate(`/edit-post/${blog_id}`);
  };

  const handleCreatePost = () => {
    navigate("/create-post");
  };

  const handleCreateThought = () => {
    navigate("/add-thought");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-200 px-4 py-2 rounded-lg">
          {error}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 transition-colors duration-200 font-nunito ">
      <div className="max-w-7xl mx-auto">
        {/* Header with Theme Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Welcome back, {user?.username}
            </p>
            <ThemeToggle />
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleCreatePost}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg transition-all shadow-lg transform hover:scale-105"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Post
            </button>
            <button
              onClick={handleCreateThought}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-lg transition-all shadow-lg transform hover:scale-105"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Thought
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-lg transition-all shadow-lg transform hover:scale-105"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Blogs Section */}
        <section className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all hover:shadow-xl">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
            Blogs
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-semibold">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-semibold">
                    Tags
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-semibold">
                    Created At
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-semibold">
                    Updated At
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-semibold">
                    Visibility
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr
                    key={blog.blog_id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                      {blog.title}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {blog.formatted_tags?.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm rounded-md px-2 py-1"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                      {new Date(blog.updated_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          blog.should_hide
                            ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                            : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                        }`}
                      >
                        {blog.should_hide ? "Hidden" : "Visible"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleVisibility(blog.blog_id, "blog")}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transform hover:scale-110"
                        >
                          {blog.should_hide ? (
                            <EyeOff className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                          )}
                        </button>
                        <button
                          onClick={() => handleEdit(blog.blog_id)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transform hover:scale-110"
                        >
                          <Edit className="h-5 w-5 text-blue-500" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.blog_id, "blog")}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transform hover:scale-110"
                        >
                          <Trash2 className="h-5 w-5 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Thoughts Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all hover:shadow-xl">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
            Thoughts
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-semibold">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-semibold">
                    Tags
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-semibold">
                    Posted At
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-semibold">
                    Visibility
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600 dark:text-gray-400 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {thoughts.map((thought) => (
                  <tr
                    key={thought.thought_id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                      {thought.title}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {thought.formatted_tags?.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm rounded-md px-2 py-1"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                      {new Date(thought.date_posted).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          thought.should_hide
                            ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                            : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                        }`}
                      >
                        {thought.should_hide ? "Hidden" : "Visible"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            toggleVisibility(thought.thought_id, "thought")
                          }
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transform hover:scale-110"
                        >
                          {thought.should_hide ? (
                            <EyeOff className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                          )}
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(thought.thought_id, "thought")
                          }
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transform hover:scale-110"
                        >
                          <Trash2 className="h-5 w-5 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
}
