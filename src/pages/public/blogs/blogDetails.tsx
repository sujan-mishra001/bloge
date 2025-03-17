import  { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MdEditor from "@uiw/react-md-editor";
import { useParams } from "react-router-dom";
import useTheme from "../../../hooks/useTheme";
import { getBlogBySlugId } from "../../../apis/blogApi";
import { BlogPost } from "../../../types/blogs";
import { Helmet } from "react-helmet";

const BlogDetail = () => {
  const { slug_id } = useParams<{ slug_id: string }>();
  const { isDarkMode } = useTheme();

  // Fetch blog data using React Query
  const { data: blog, error, isLoading } = useQuery<BlogPost>({
    queryKey: ["blog", slug_id],
    queryFn: () => getBlogBySlugId(slug_id!),
    enabled: !!slug_id,
  });

  // Extract headings directly from the blog content
  const headings = blog?.content.match(/^##?.+/gm)?.map((heading) => {
    const text = heading.replace(/^#+\s*/, "");
    const id = text.toLowerCase().replace(/\s+/g, "-");
    return { id, text };
  }) || [];

  const [activeHeading, setActiveHeading] = useState<string>("");

  // Intersection Observer for active heading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Scroll to top after the blog content is loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blog]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg dark:bg-bg-dark flex justify-center">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="flex justify-center">
            <div className="space-y-10 max-w-3xl w-full">
              <div className="border-b border-gray-300 dark:border-gray-700 pb-8">
                <article className="space-y-6">
                  <header className="space-y-4">
                    <h1 className="text-2xl sm:text-3xl font-light text-title dark:text-title-dark font-josefin">
                      Loading blog details...
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
                      Please wait a moment while the blog details are being fetched.
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

  // Handle Error or No Blog Available
  if (error || !blog) {
    return (
      <div className="min-h-screen bg-bg dark:bg-bg-dark flex justify-center">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="flex justify-center">
            <div className="space-y-10 max-w-3xl w-full">
              <div className="border-b border-gray-300 dark:border-gray-700 pb-8">
                <article className="space-y-6">
                  <header className="space-y-4">
                    <h1 className="text-2xl sm:text-3xl font-light text-title dark:text-title-dark font-josefin">
                      No blog details available.
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
                      Sorry, couldn't fetch the blog details right now. Please try again later.
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
    <main className="min-h-screen bg-bg dark:bg-bg-dark">
      <Helmet>
        <title>{blog.title}</title>
        <meta name="description" content={blog.content.substring(0, 150)} />
        {blog.formatted_tags?.map((tag, index) => (
          <meta key={index} name="keywords" content={tag} />
        ))}
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <article className="w-full lg:w-3/4">
            {blog.title_image_url && (
              <div className="aspect-[21/9] mb-12 overflow-hidden">
                <img
                  src={blog.title_image_url}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <header className="mb-12">
              <h1 className="text-4xl sm:text-5xl font-semibold font-josefin mb-6 text-text dark:text-text-dark">
                {blog.title}
              </h1>
              <div className="space-x-4 text-sm text-text dark:text-text-dark">
                <time>{new Date(blog.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</time>
                {blog.updated_at !== blog.created_at && (
                  <span>• Updated {new Date(blog.updated_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}</span>
                )}
              </div>
            </header>

            <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none">
              <MdEditor.Markdown
                style={{
                  fontFamily: "Nunito, sans-serif",
                  backgroundColor: isDarkMode ? "#161820" : "#F7F3E9",
                  color: isDarkMode ? "#E6E6EC" : "#2A2A2A",
                  padding: "1rem",
                  borderRadius: "0.2rem",
                }}
                source={blog.content.replace(/^##?\s(.+)/gm, (_, text) => {
                  const id = text.toLowerCase().replace(/\s+/g, "-");
                  return `## <a id="${id}"></a>${text}`;
                })}
              />
            </div>
          </article>

          {/* Table of Contents */}
          <aside className="hidden lg:block w-1/4">
            <div className="sticky top-8">
              <nav className="space-y-1 text-sm">
                <p className="text-title dark:text-title-dark font-medium font-josefin mb-4">
                  Table of Contents
                </p>
                {headings.map(({ id, text }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={`
                      block py-1 px-4 font-nunito border-l-2 transition-colors
                      hover:text-text dark:hover:text-text-dark
                      ${activeHeading === id
                        ? 'border-text dark:border-text-dark text-text dark:text-text-dark'
                        : 'border-accent dark:border-accent-dark text-accent dark:text-accent-dark'}
                    `}
                  >
                    {text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default BlogDetail;
