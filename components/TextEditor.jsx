import { useCallback } from "react";
import { EditorContent } from "@tiptap/react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Highlighter,
  Link,
  Unlink,
} from "lucide-react";

const ToolBar = ({ editor }) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return <></>;

  return (
    <div className="p-2 rounded-lg bg-white mb-2 flex gap-2 items-center">
      <button
        className={`hover:bg-black-primary hover:bg-opacity-20 p-1 rounded-lg ${
          editor.isActive("heading", { level: 2 })
            ? "bg-black-primary bg-opacity-20"
            : ""
        }`}
        title="Heading 2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="w-4 h-4" />
      </button>

      <button
        className={`hover:bg-black-primary hover:bg-opacity-20 p-1 rounded-lg ${
          editor.isActive("bold") ? "bg-black-primary bg-opacity-20" : ""
        }`}
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        className={`hover:bg-black-primary hover:bg-opacity-20 p-1 rounded-lg ${
          editor.isActive("italic") ? "bg-black-primary bg-opacity-20" : ""
        }`}
        title="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        className={`hover:bg-black-primary hover:bg-opacity-20 p-1 rounded-lg ${
          editor.isActive("bulletList") ? "bg-black-primary bg-opacity-20" : ""
        }`}
        title="Bullet List"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="w-4 h-4" />
      </button>
      <button
        className={`hover:bg-black-primary hover:bg-opacity-20 p-1 rounded-lg ${
          editor.isActive("orderedList") ? "bg-black-primary bg-opacity-20" : ""
        }`}
        title="Ordered List"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <button
        className={`hover:bg-black-primary hover:bg-opacity-20 p-1 rounded-lg ${
          editor.isActive("highlight") ? "bg-black-primary bg-opacity-20" : ""
        }`}
        title="Highlight"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
      >
        <Highlighter className="w-4 h-4" />
      </button>
      <button
        className={`hover:bg-black-primary hover:bg-opacity-20 p-1 rounded-lg ${
          editor.isActive("link") ? "bg-black-primary bg-opacity-20" : ""
        }`}
        title="Link"
        onClick={setLink}
      >
        <Link className="w-4 h-4" />
      </button>
      <button
        className={`hover:bg-black-primary hover:bg-opacity-20 p-1 rounded-lg`}
        title="Unlink"
        onClick={() => editor.chain().focus().unsetLink().run()}
      >
        <Unlink className="w-4 h-4" />
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
