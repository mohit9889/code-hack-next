import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
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

const TextEditor = ({ description = "", setDescription = () => {} }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({
        HTMLAttributes: {
          class: "font-bold",
          level: [2],
        },
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-black-primary bg-opacity-20 rounded-md",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc pl-5",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal pl-5",
        },
      }),
      ListItem,
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          "p-2 rounded-lg outline-none focus:border bg-white min-h-[100px]",
      },
    },
    onUpdate({ editor }) {
      setDescription(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
