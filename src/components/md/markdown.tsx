import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

interface MarkdownProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
}

const MarkdownEditor: React.FC<MarkdownProps> = ({ value, onChange }) => {
  return (
    <div data-color-mode="dark">
      <MDEditor
        height={500}
        value={value}
        onChange={onChange}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
    </div>
  );
};

export default MarkdownEditor;
