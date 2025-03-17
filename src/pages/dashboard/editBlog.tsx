import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editBlog, getBlogById } from "../../apis/blogApi";
import { toast, ToastContainer } from "react-toastify";
import {
  Copy,
  Eye,
  EyeOff,
  FileEdit,
  Loader,
  Send,
  TagsIcon,
  X,
} from "lucide-react";
import { TitleInput } from "../../components/blogs/TitleInput";
import { ImageUpload } from "../../components/blogs/ImageUpload";
import { MDEditorComp } from "../../components/blogs/MdEditorComp";
import { TagsInput } from "../../components/blogs/TagsInput";


const EditPost: React.FC = () => {
  const { blog_id } = useParams<{ blog_id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("Untitled");
  const [content, setContent] = useState("");
  const [showPreview, setShowPreview] = useState(true);
  const [titleImageUrl, setTitleImageUrl] = useState<string>("");
  const [additionalImgUrls, setAdditionalImgUrls] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    const fetchBlog = async () => {
      if (!blog_id) return;
      setIsLoading(true);
      try {
        const response = await getBlogById(blog_id);
        console.log("Fetched Blog:", response);
        if (response) {
          setTitle(response.title || "Untitled");
          setContent(response.content || "");
          setTitleImageUrl(response.title_image_url || "");
          setAdditionalImgUrls(response.formatted_additional_img_url || []);
          setTags(response.formatted_tag || ["wow", "nice"]);
        } else {
          toast.error("Failed to load the blog post.");
        }
      } catch (error) {
        toast.error("Error fetching blog post.");
        console.error("Error fetching blog:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [blog_id]);

  const handleUpdate = async () => {
    if (!title || !content) {
      toast.error("Please fill in both title and content.");
      return;
    }

    setIsSubmitting(true);

    const updatedBlog = {
      title: title,
      content: content,
      title_image_url: titleImageUrl,
      formatted_tags: tags,
      formatted_additional_img_urls: additionalImgUrls,
    };

    try {
      const response = await editBlog(blog_id!, updatedBlog);
      if (response) {
        toast.success("Post updated successfully.");
        navigate("/dashboard");
      } else {
        toast.error("Failed to update the post. Please try again.");
      }
    } catch (error) {
      toast.error("Error updating the post. Please try again.");
      console.error("Error updating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Image URL copied to clipboard");
    });
  };

  const handleRemoveAdditionalImage = (urlToRemove: string) => {
    setAdditionalImgUrls((prev) => prev.filter((url) => url !== urlToRemove));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-6 h-6 animate-spin text-blue-600 dark:text-blue-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-8">
          <FileEdit className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Edit Post
          </h1>
        </div>

        <div className="space-y-8">
          {/* Title and Cover Image Section */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-100 dark:border-gray-600">
            <TitleInput title={title} onTitleChange={setTitle} />
            <ImageUpload
              onImageUpload={setTitleImageUrl}
              label="Cover Image"
              currentImage={titleImageUrl}
            />
          </div>

          {/* Additional Images Section */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-100 dark:border-gray-600">
            <ImageUpload
              onImageUpload={(url) =>
                setAdditionalImgUrls((prev) => [...prev, url])
              }
              label="Additional Images"
              currentImage={
                additionalImgUrls[additionalImgUrls.length - 1] || ""
              }
            />
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
                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
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
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-100 dark:border-gray-600">
            <MDEditorComp
              content={content}
              onContentChange={setContent}
              showPreview={showPreview}
            />
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
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowPreview((prev) => !prev)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800"
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
              onClick={handleUpdate}
              disabled={isSubmitting || !title || !content}
              className={`inline-flex items-center gap-2 px-6 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                isSubmitting || !title || !content
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Update Post
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

export default EditPost;
