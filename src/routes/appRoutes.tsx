import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./protectedRoute";
import Blogs from "../pages/public/blogs/blogs";
import Thoughts from "../pages/public/thoughts/thoughts";
import AboutMe from "../pages/public/aboutMe";

import AddThought from "../pages/dashboard/addThought";
import LoginPage from "../pages/auth/loginPage";

import Dashboard from "../pages/dashboard/dashboard";
import CreatePost from "../pages/dashboard/createPost";
import Layouts from "../layouts/layouts";
import EditPost from "../pages/dashboard/editBlog";
import BlogDetail from "../pages/public/blogs/blogDetails";



const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* public */}
        <Route element={<Layouts />}>
          <Route path="/" element={<AboutMe />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug_id" element={<BlogDetail />} />
          <Route path="/thoughts" element={<Thoughts />} />
         
        </Route>
        {/* login route */}
        <Route path="/login" element={<LoginPage />} />
        {/* dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/edit-post/:blog_id" element={<EditPost />} />
          <Route path="/add-thought" element={<AddThought />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;


