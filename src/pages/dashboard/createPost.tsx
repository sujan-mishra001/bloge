import React, { useState } from "react";
import { Blog } from "../../types/blogs";
import { createBlog } from "../../apis/blogApi";
import {
  Eye,
  EyeOff,
  Send,
  Pencil,
  Image as ImageIcon,
  Tags as TagsIcon,
  FileEdit,
  Loader,
  X,
  Copy,
  Plus
} from "lucide-react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { ImageUpload } from "../../components/blogs/ImageUpload";
import { MDEditorComp } from "../../components/blogs/MdEditorComp";
import { TitleInput } from "../../components/blogs/TitleInput";
import { TagsInput } from "../../components/blogs/TagsInput";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("Untitled");
  const [content, setContent] = useState("");
  const [showPreview, setShowPreview] = useState(true);
  const [titleImageUrl, setTitleImageUrl] = useState<string>("");
  const [additionalImgUrls, setAdditionalImgUrls] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async () => {
    if (!title || !content) {
      toast.error("Please fill in both title and content");
      return;
    }
    

    setIsSubmitting(true);
    const blogData: Blog = {
      title,
      content,
      formatted_tags:tags,
      title_image_url:titleImageUrl,
      formatted_additional_img_url:additionalImgUrls,
    };

    try {
      const response = await createBlog(blogData);
      if (!response) {
        toast.error("Failed to create the post. Please try again.");
      } else {
        toast.success("Post created successfully");
        handleClearAllInputs();
      }
    } catch (error) {
      toast.error("Error creating post. Please try again.");
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdditionalImageUpload = (url: string) => {
    setAdditionalImgUrls((prev) => [...prev, url]);
    toast.info("Image URL added to additional images");
  };

  const handleCopyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Image URL copied to clipboard");
    });
  };

  const handleRemoveAdditionalImage = (urlToRemove: string) => {
    setAdditionalImgUrls((prev) => 
      prev.filter((url) => url !== urlToRemove)
    );
  };

  const handleClearAllInputs = () => {
    setTitle("Untitled");
    setContent("");
    setShowPreview(true);
    setTitleImageUrl("");
    setAdditionalImgUrls([]);
    setTags([]);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <FileEdit className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Create a New Blog Post
            </h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Title Section */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Pencil className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Post Title
              </h2>
            </div>
            <section 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <TitleInput 
              title={title} 
              onTitleChange={setTitle} 
              
            />

            </section>
           
          </div>

          {/* Cover Image Section */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <ImageIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Cover Image
              </h2>
            </div>
            <section  className="w-full" >
            <ImageUpload
              onImageUpload={setTitleImageUrl}
              label="Upload Cover Image"
              currentImage={titleImageUrl}
            />

            </section>
           
          </div>

          {/* Additional Images Section */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Additional Images
              </h2>
            </div>
           <section  className="w-full" >
           <ImageUpload
              onImageUpload={handleAdditionalImageUpload}
              label="Upload Additional Image"
              currentImage={additionalImgUrls[additionalImgUrls.length - 1] || ""}
             
            />
           </section>
           
            {additionalImgUrls.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {additionalImgUrls.map((url, index) => (
                  <div 
                    key={index} 
                    className="relative group rounded-lg overflow-hidden shadow-md"
                  >
                    <img
                      src={url}
                      alt={`Additional ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      <button 
                        onClick={() => handleCopyImageUrl(url)}
                        className="bg-white dark:bg-gray-900 dark:hover:bg-gray-800 p-2 rounded-full hover:bg-gray-100 transition"
                      >
                        <Copy className="w-5 h-5 text-gray-700 dark:text-gray-50" />
                      </button>
                      <button 
                        onClick={() => handleRemoveAdditionalImage(url)}
                        className="bg-red-500 p-2 rounded-full hover:bg-red-600 transition"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Content Editor Section */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <section className="w-full" >
            <MDEditorComp
              content={content}
              onContentChange={setContent}
              showPreview={showPreview}
              
            />
            </section>
          </div>

          {/* Tags Section */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <TagsIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Tags
              </h2>
            </div>
            <TagsInput tags={tags} onTagsChange={setTags} />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-between gap-4">
            <button
              onClick={() => setShowPreview((prev) => !prev)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium 
                bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 
                focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
              onClick={handleSubmit}
              disabled={isSubmitting || !title || !content}
              className={`inline-flex items-center gap-2 px-6 py-2 text-sm font-medium 
                text-white rounded-lg focus:outline-none focus:ring-2 
                focus:ring-green-500 transition-all
                ${
                  isSubmitting || !title || !content
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Create Post
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

export default CreatePost;
