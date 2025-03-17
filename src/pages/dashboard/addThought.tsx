import React, { useState } from "react";
import { 
  Eye, 
  EyeOff, 
  Send, 
  Pencil, 
  Tags as TagsIcon, 
  FileEdit, 
  Loader,
  RefreshCw 
} from "lucide-react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  TitleInput } from "../../components/blogs/TitleInput";
import { MDEditorComp } from "../../components/blogs/MdEditorComp";
import { createThought } from "../../apis/thoughtApi";
import { Thought } from "../../types/thoughts";
import { TagsInput } from "../../components/blogs/TagsInput";

const AddThought: React.FC = () => {
  const [title, setTitle] = useState("Untitled");
  const [content, setContent] = useState("");
  const [showPreview, setShowPreview] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async () => {
    if (!title || !content) {
      toast.error("Please fill in both title and content");
      return;
    }

    setIsSubmitting(true);

    try {
      const thought: Thought = {
        title,
        content,
        formatted_tag:tags,
      };
      await createThought(thought);
      toast.success("Thought added successfully");
      handleClearAllInputs();
    } catch (error) {
      toast.error("Error creating thought. Please try again.");
      console.error("Error creating thought:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const handleClearAllInputs = () => {
    setTitle("Untitled");
    setContent("");
    setShowPreview(true);
    setTags([]);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <FileEdit className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Add a New Thought
            </h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Title Section */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Pencil className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Thought Title
              </h2>
            </div>
            <section className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <TitleInput title={title} onTitleChange={setTitle} />
            </section>
          </div>

          {/* Content Editor Section */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <section className="w-full">
              <MDEditorComp content={content} onContentChange={setContent} showPreview={showPreview} />
            </section>
          </div>

          {/* Tags Section */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <TagsIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Tags</h2>
            </div>
            <TagsInput tags={tags} onTagsChange={setTags} />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex gap-4">
              <button
                onClick={() => setShowPreview((prev) => !prev)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              >
                {showPreview ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Hide Preview
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Show Preview
                  </>
                )}
              </button>

              <button
                onClick={handleClearAllInputs}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !title || !content}
              className={`inline-flex items-center gap-2 px-6 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                isSubmitting || !title || !content ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Add Thought
                </>
              )}
            </button>
          </div>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default AddThought;
