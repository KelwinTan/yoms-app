import { v4 } from "uuid";
import { jsPDF } from "jspdf";
import ExampleTheme from "./themes/ExampleTheme";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { $generateHtmlFromNodes } from "@lexical/html";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import React from "react";
import { LexicalEditor } from "lexical/LexicalEditor";
import { EditorState } from "lexical";

import { CustomHeadingNode } from "./nodes/CustomHeadingNode";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export interface EditorProps {
  //   onPublished?: (p: EditorState) => void;
  editable?: boolean;
  initalEditorState?: EditorState;
}

export default function Editor({
  //   onPublished,
  editable = true,
  initalEditorState,
}: EditorProps) {
  const editorStateRef = React.useRef<EditorState | null>(null);
  const editorRef = React.useRef<LexicalEditor | null>(null);

  const editorConfig: InitialConfigType = React.useMemo(
    () => ({
      // The editor theme
      theme: ExampleTheme,
      // Handling of errors during update
      onError(error: Error, editor: LexicalEditor) {
        throw error;
      },
      // Any custom nodes go here
      nodes: [
        CustomHeadingNode,
        {
          replace: HeadingNode,
          with: (node: HeadingNode) =>
            new CustomHeadingNode(node.getTag(), node.key),
        },
        ListNode,
        ListItemNode,
        QuoteNode,
        CodeNode,
        CodeHighlightNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        AutoLinkNode,
        LinkNode,
      ],
      namespace: `Editor ${v4()}`,
      editable,
      editorState: initalEditorState,
    }),
    [editable, initalEditorState]
  );

  //   const onPublish = () => {
  //     if (editorStateRef.current) {
  //       onPublished?.(editorStateRef.current);
  //     }
  //   };

  //   const onPrint = () => {
  //     if (!editorRef.current) return;

  //     editorRef.current.update(() => {
  //       const htmlString = $generateHtmlFromNodes(
  //         editorRef.current as LexicalEditor,
  //         null
  //       );

  //       console.log(htmlString);

  //       const doc = new jsPDF();

  //       doc.html(htmlString, {
  //         callback: (doc: any) => {
  //           doc.save();
  //         },
  //       });
  //     });
  //   };

  //   const PublishButton = () => {
  //     if (!editable) return null;

  //     return <button onClick={onPublish}>Publish</button>;
  //   };

  //   const PrintButton = () => {
  //     if (!editable) return null;

  //     return <button onClick={onPrint}>Print to PDF</button>;
  //   };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        {editable && <ToolbarPlugin />}
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          {editable && (
            <>
              <HistoryPlugin />
              <AutoFocusPlugin />
              <CodeHighlightPlugin />
              <ListPlugin />
              <LinkPlugin />
              <AutoLinkPlugin />
              <OnChangePlugin
                onChange={(editorState, editor) => {
                  editorStateRef.current = editorState;
                  editorRef.current = editor;
                }}
                ignoreSelectionChange
              />
              <ListMaxIndentLevelPlugin maxDepth={7} />
              <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            </>
          )}
        </div>
      </div>
      {/* <PublishButton /> */}
      {/* <PrintButton /> */}
    </LexicalComposer>
  );
}
