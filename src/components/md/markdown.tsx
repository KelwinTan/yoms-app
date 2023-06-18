import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

function MarkdownEditor() {
  const [value, setValue] = useState("Job Description");

  return (
    <div data-color-mode="dark">
      <MDEditor
        value={value}
        onChange={(val: string | undefined) => {
          setValue(val || "");
          console.log(val);
        }}
      />
    </div>
  );
}

export default MarkdownEditor;
