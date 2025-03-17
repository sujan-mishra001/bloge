import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ThoughtPost } from "../../../types/thoughts";
import { getVisibleThoughts } from "../../../apis/thoughtApi";
import MdEditor from "@uiw/react-md-editor";
import useTheme from "../../../hooks/useTheme";
import { ChevronRight, ArrowLeft } from "lucide-react";

export default function Thoughts() {
  const [expandedThought, setExpandedThought] = useState<string | null>(null);
  const {
    data: thoughts = [],
    error,
    isLoading,
  } = useQuery<ThoughtPost[]>({
    queryKey: ["thoughts"],
    queryFn: getVisibleThoughts,
  });
  const { isDarkMode } = useTheme();

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
                      Loading thoughts...
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
                      Thoughts are on the brink of arrival, held for a moment in
                      fleeting stillness.
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

  // Handle Error or No Thoughts Available
  if (error || !thoughts?.length) {
    return (
      <div className="min-h-screen bg-bg dark:bg-bg-dark flex justify-center">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Error or Empty Thoughts View */}
          <div className="flex justify-center">
            <div className="space-y-10 max-w-3xl w-full">
              {/* Single "Error / No Thoughts" View */}
              <div className="border-b border-gray-300 dark:border-gray-700 pb-8">
                <article className="space-y-6">
                  <header className="space-y-4">
                    <h1 className="text-2xl sm:text-3xl font-light text-title dark:text-title-dark font-josefin">
                      No thoughts available.
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
                      Sorry, couldn't fetch any thoughts right now. Please try
                      again later.
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
      {/* List View */}
      <div
        className={`transition-all duration-300 ${
          expandedThought ? "lg:opacity-0 lg:pointer-events-none" : ""
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="mb-16">
            <h1 className="text-3xl sm:text-4xl font-light text-title dark:text-title-dark font-josefin">
              random thoughts
            </h1>
            <p className="mt-4 text-accent dark:text-accent-dark font-nunito">
              A collection of ideas, experiences, and musings.
            </p>
          </header>

          <div className="space-y-6 sm:space-y-8">
            {thoughts.length > 0 ? (
              thoughts.map((thought) => {
                return (
                  <div key={thought.slug_id} className="group">
                    {/* Mobile View */}
                    <div className="sm:hidden space-y-3">
                      <time className="text-sm text-accent dark:text-accent-dark font-nunito block">
                        {new Date(thought.date_posted).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </time>
                      <button
                        onClick={() => setExpandedThought(thought.slug_id)}
                        className="block w-full text-left"
                      >
                        <h2 className="text-xl font-nunito text-title dark:text-title-dark">
                          {thought.title}
                        </h2>
                      </button>
                    </div>

                    {/* Desktop View */}
                    <div className="hidden sm:flex items-baseline gap-x-6 group">
                      <time className="text-sm text-accent dark:text-accent-dark font-nunito min-w-[140px]">
                        {new Date(thought.date_posted).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            
                          }
                        )}
                      </time>
                      <div className="flex-1">
                        <button
                          onClick={() => setExpandedThought(thought.slug_id)}
                          className="group/title flex items-center gap-2"
                        >
                          <h2 className="text-lg font-nunito text-title dark:text-title-dark group-hover/title:text-accent-dark">
                            {thought.title}
                          </h2>
                          <ChevronRight className="w-4 h-4 text-accent dark:text-accent-dark opacity-0 group-hover/title:opacity-100 group-hover/title:translate-x-1 transition-all" />
                        </button>
                      </div>
                    </div>
                    <div className="border-b border-zinc-200 dark:border-zinc-800 mt-6 opacity-50" />
                  </div>
                );
              })
            ) : (
              <p className="text-center py-12 text-accent dark:text-accent-dark font-nunito">
                No thoughts at the moment.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Expanded View */}
      {expandedThought && (
        <div className="fixed inset-0 bg-bg dark:bg-bg-dark overflow-y-auto lg:animate-fadeIn">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
            {/* Back Button */}
            <button
              onClick={() => setExpandedThought(null)}
              className="flex items-center gap-2 text-text dark:text-text-dark mb-8 font-nunito"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to thoughts
            </button>

            {/* Expanded Content */}
            {thoughts.find((t) => t.slug_id === expandedThought) && (
              <article className="space-y-6">
                <header className="space-y-4">
                  <h1 className="text-2xl sm:text-3xl font-light text-title dark:text-title-dark font-josefin">
                    {
                      thoughts.find((t) => t.slug_id === expandedThought)
                        ?.title
                    }
                  </h1>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 items-center text-sm text-accent dark:text-accent-dark font-nunito">
                    <time>
                      {new Date(
                        thoughts.find((t) => t.slug_id === expandedThought)
                          ?.date_posted || ""
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </header>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <MdEditor.Markdown
                    style={{
                      fontFamily: "Nunito, sans-serif",
                        backgroundColor: isDarkMode ? "#161820" : "#F7F3E9",
                        color: isDarkMode ? "#E6E6EC" : "#2A2A2A",
                        padding: "2rem",
                        borderRadius: "0.2rem",
                    }}
                    source={
                      thoughts.find((t) => t.slug_id === expandedThought)
                        ?.content
                    }
                  />
                </div>
              </article>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
