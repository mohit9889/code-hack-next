import { EditorContent } from "@tiptap/react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Highlighter,
} from "lucide-react";

const ToolBar = ({ editor }) => {
  if (!editor) return <></>;
  return (
    <div className="p-2 rounded-lg bg-white mb-2 flex gap-2 items-center">
      <button
        className={`hover:bg-black-primary hover:bg-opacity-20 p-1 rounded-lg ${
          editor.isActive("heading", { level: 2 })
            ? "bg-black-primary bg-opacity-20"
            : ""
        }`}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="w-4 h-4" />
      </button>
      <button
        className={`hover:bg-black-primary hover:bg-opacity-20 p-1 rounded-lg ${
          editor.isActive("bold") ? "bg-black-primary bg-opacity-20" : ""
        }`}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        className={`hover:bg-black-primary hover:bg-opacity-20 p-1 rounded-lg ${
          editor.isActive("italic") ? "bg-black-primary bg-opacity-20" : ""
        }`}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        className={`hover:bg-black-primary hover:bg-opacity-20 p-1 rounded-lg ${
          editor.isActive("bulletList") ? "bg-black-primary bg-opacity-20" : ""
        }`}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="w-4 h-4" />
      </button>
      <button
        className={`hover:bg-black-primary hover:bg-opacity-20 p-1 rounded-lg ${
          editor.isActive("orderedList") ? "bg-black-primary bg-opacity-20" : ""
        }`}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <button
        className={`hover:bg-black-primary hover:bg-opacity-20 p-1 rounded-lg ${
          editor.isActive("highlight") ? "bg-black-primary bg-opacity-20" : ""
        }`}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
      >
        <Highlighter className="w-4 h-4" />
      </button>
    </div>
  );
};

const TextEditor = ({ editor }) => {
  if (!editor) return <></>;
  return (
    <div className="flex flex-col">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
