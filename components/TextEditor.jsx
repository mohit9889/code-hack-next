import { useCallback } from 'react';
import { EditorContent } from '@tiptap/react';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Highlighter,
  Link,
  Unlink,
} from 'lucide-react';

/**
 * Toolbar Component for TextEditor
 *
 * Provides formatting buttons for text editing, including headings, bold, italic, lists, and links.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {import('@tiptap/react').Editor} props.editor - The TipTap editor instance
 * @returns {JSX.Element} - The toolbar UI
 */
const ToolBar = ({ editor }) => {
  /**
   * Handles setting or updating a link in the editor.
   */
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL', previousUrl);

    if (url === null) return; // User canceled
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  /**
   * Renders a button with active state handling.
   *
   * @param {Object} param
   * @param {string} param.label - Accessible label for the button
   * @param {JSX.Element} param.icon - Icon component
   * @param {Function} param.onClick - Click event handler
   * @param {boolean} param.isActive - Whether the button is active
   * @returns {JSX.Element} The button UI
   */
  const renderButton = ({ label, icon, onClick, isActive }) => (
    <button
      aria-label={label}
      className={`rounded-lg p-1 hover:bg-black-primary/20 ${
        isActive ? 'bg-black-primary/20' : ''
      }`}
      title={label}
      onClick={onClick}
    >
      {icon}
    </button>
  );

  return (
    <div className="mb-2 flex items-center gap-2 rounded-lg bg-white p-2">
      {renderButton({
        label: 'Heading 2',
        icon: <Heading2 className="size-4" />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: editor.isActive('heading', { level: 2 }),
      })}
      {renderButton({
        label: 'Bold',
        icon: <Bold className="size-4" />,
        onClick: () => editor.chain().focus().toggleBold().run(),
        isActive: editor.isActive('bold'),
      })}
      {renderButton({
        label: 'Italic',
        icon: <Italic className="size-4" />,
        onClick: () => editor.chain().focus().toggleItalic().run(),
        isActive: editor.isActive('italic'),
      })}
      {renderButton({
        label: 'Bullet List',
        icon: <List className="size-4" />,
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        isActive: editor.isActive('bulletList'),
      })}
      {renderButton({
        label: 'Ordered List',
        icon: <ListOrdered className="size-4" />,
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: editor.isActive('orderedList'),
      })}
      {renderButton({
        label: 'Highlight',
        icon: <Highlighter className="size-4" />,
        onClick: () => editor.chain().focus().toggleHighlight().run(),
        isActive: editor.isActive('highlight'),
      })}
      {renderButton({
        label: 'Link',
        icon: <Link className="size-4" />,
        onClick: setLink,
        isActive: editor.isActive('link'),
      })}
      {renderButton({
        label: 'Unlink',
        icon: <Unlink className="size-4" />,
        onClick: () => editor.chain().focus().unsetLink().run(),
        isActive: false,
      })}
    </div>
  );
};

/**
 * TextEditor Component
 *
 * A rich-text editor with a toolbar.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {import('@tiptap/react').Editor} props.editor - The TipTap editor instance
 * @returns {JSX.Element} - The text editor UI
 */
const TextEditor = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-col">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
