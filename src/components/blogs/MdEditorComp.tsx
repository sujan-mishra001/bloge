import MDEditor from "@uiw/react-md-editor";

import rehypeSanitize from "rehype-sanitize";
import useTheme from "../../hooks/useTheme";

interface MDEditorCompProps {
  content: string;
  onContentChange: (content: string) => void;
  showPreview: boolean;
}

export const MDEditorComp: React.FC<MDEditorCompProps> = ({
  content,
  onContentChange,
  showPreview,
}) => {
  const {isDarkMode} = useTheme();

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Content</label>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full ">
          <MDEditor
            value={content}
            onChange={(newValue) => onContentChange(newValue || "")}
            height={600}
            preview="edit"
            data-color-mode={isDarkMode ? "dark" : "light"}
            textareaProps={{
              placeholder: "Write your post content here...",
            }}

          />
        </div>

        {showPreview && (
          <div className="">
            <div className="border rounded-lg p-6 h-[600px] overflow-y-auto">
              <MDEditor.Markdown
                source={content}
                className="prose max-w-none"
                style={{
                  backgroundColor:isDarkMode ? '#334155':'transparent',
                  color: isDarkMode ? '#ffffff' : '#000000'
                 }}
                rehypePlugins={[rehypeSanitize]}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
