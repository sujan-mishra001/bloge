import { useQuery } from "@tanstack/react-query";
import MdEditor from "@uiw/react-md-editor";
import { Link } from "react-router-dom";
import { getVisibleBlogs } from "../../../apis/blogApi";
import { BlogPost } from "../../../types/blogs";
import useTheme from "../../../hooks/useTheme";
import { useState, useEffect } from "react";


const Blogs = () => {
  const { data: blogs, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["blogs"],
    queryFn: getVisibleBlogs,
    staleTime: 1000 * 60 * 5,
  });


  const { isDarkMode } = useTheme();

  // Scroll state
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle isLoading separately
  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg dark:bg-bg-dark flex justify-center">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Loading State View */}
          <div className="flex justify-center">
            <div className="space-y-10 max-w-3xl w-full">
              {/* Single "Loading" View */}
              <div className="border-b border-gray-300 dark:border-gray-700 pb-8">
                <article className="space-y-6">
                  <header className="space-y-4">
                    <h1 className="text-2xl sm:text-3xl font-light text-title dark:text-title-dark font-josefin">
                      Loading blogs...
                    </h1>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 items-center text-sm text-accent dark:text-accent-dark font-nunito">
                      <time>
                        {new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </header>

                  <div className="prose prose-lg dark:prose-invert max-w-none my-4 text-left">
                    <h1 className="text-text dark:text-text-dark font-nunito">
                      Please wait a moment while the blogs are being fetched.
                    </h1>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle Error or No Blogs Available
  if (error || !blogs?.length) {
    return (
      <div className="min-h-screen bg-bg dark:bg-bg-dark flex justify-center">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Error or Empty Blogs View */}
          <div className="flex justify-center">
            <div className="space-y-10 max-w-3xl w-full">
              {/* Single "Error / No Blogs" View */}
              <div className="border-b border-gray-300 dark:border-gray-700 pb-8">
                <article className="space-y-6">
                  <header className="space-y-4">
                    <h1 className="text-2xl sm:text-3xl font-light text-title dark:text-title-dark font-josefin">
                      No blogs available.
                    </h1>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 items-center text-sm text-accent dark:text-accent-dark font-nunito">
                      <time>
                        {new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </header>

                  <div className="prose prose-lg dark:prose-invert max-w-none my-4 text-left">
                    <h1 className="text-text dark:text-text-dark font-nunito">
                      Sorry, couldn't fetch any blogs right now. Please try again later.
                    </h1>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg dark:bg-bg-dark flex justify-center">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Blog Posts Title and Blog Title on Same Line */}
        <div className="flex items-center mb-12">
          <h1 className="font-josefin font-light text-3xl md:text-4xl text-title dark:text-title-dark mr-4">
            blog posts<br /> <small className="mt-4 text-accent dark:text-accent-dark font-nunito text-xl" >Here are the topics based on my interests and personal research.</small>
          </h1>
          
        </div>

        {/* Centered Blog List */}
        <div className="flex justify-center">
          <div className="space-y-10 max-w-3xl w-full">
            {blogs?.length ? (
              blogs.map((blog) => (
                <div key={blog.blog_id} className="border-b border-gray-300 dark:border-gray-700 pb-8">
                  {/* Blog Title (Left-Aligned) */}
                  <h3 className="text-3xl font-bold text-text dark:text-text-dark font-josefin mb-4 text-left">
                    <Link to={`/blogs/${blog.slug_id}`}>{blog.title}</Link>
                  </h3>

                  {/* Blog Image (Responsive & Uniform Size) */}
                  {blog.title_image_url && (
                    <div className="relative aspect-[16/9] w-full max-w-2xl mx-auto overflow-hidden rounded-sm shadow-md">
                      <img
                        src={blog.title_image_url}
                        alt={blog.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Created At */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-nunito mt-3 text-left">
                    {new Date(blog.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>

                  {/* Blog Content Preview (20% of Content) */}
                  <div className="prose dark:prose-invert max-w-none my-4 text-left">
                    <MdEditor.Markdown
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        backgroundColor: isDarkMode ? "#161820" : "#F7F3E9",
                        color: isDarkMode ? "#E6E6EC" : "#2A2A2A",
                        padding: "1rem",
                        borderRadius: "0.2rem",
                      }}
                      source={blog.content.slice(0, Math.ceil(blog.content.length * 0.2)) + "..."}
                    />
                  </div>

                  {/* Read More Link */}
                  <Link
                    to={`/blogs/${blog.slug_id}`}
                    className="inline-flex items-center gap-2 text-accent hover:text-accent-dark dark:text-accent-dark dark:hover:text-accent font-semibold font-mono text-md group transition-colors text-left"
                  >
                    Read More
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500 font-josefin">
                No blogs found.
              </div>
            )}
          </div>
        </div>

        {/* Back to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            ↑
          </button>
        )}
      </div>
    </div>
  );
};

export default Blogs;
