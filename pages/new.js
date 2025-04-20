import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { submitHack } from '~/services';
import SEO from '~/components/SEO';
import { addNewSeo } from '~/utils/seo';
import { initialCode, languages } from '~/constants';
import SendSvg from '~/public/icons/send.svg';
import WarningSvg from '~/public/icons/warning.svg';
import toast from 'react-hot-toast';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Link from '@tiptap/extension-link';

// Dynamically import components for performance optimization
const CustomHeading = dynamic(() => import('~/components/Heading'));
const BackButton = dynamic(() => import('~/components/BackButton'));
const CodeEditor = dynamic(() => import('~/components/CodeEditor'));
const Tooltip = dynamic(() => import('~/components/Tooltip'));
const TextEditor = dynamic(() => import('~/components/TextEditor'));

/**
 * Reusable InputField component to avoid repetition
 */
const InputField = ({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  tooltip,
}) => (
  <div className="mt-7 flex flex-col">
    <label htmlFor={name} className="flex justify-between">
      <span className="flex">
        <span className="text-sm font-bold">{label}</span>
        {required && <span className="text-2xl text-orange">*</span>}
      </span>
      {tooltip && (
        <Tooltip text={tooltip}>
          <span className="icon-15 animate-blinkingBg cursor-pointer">
            <WarningSvg />
          </span>
        </Tooltip>
      )}
    </label>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      className="rounded-lg p-2 outline-none focus:border"
    />
  </div>
);

const New = () => {
  const currentCodeLang = languages[0].name.toLowerCase();
  const [code, setCode] = useState(initialCode);
  const [description, setDescription] = useState('');

  // Initialize TipTap editor for rich text description input
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({ HTMLAttributes: { class: 'font-bold', level: [2] } }),
      Highlight.configure({
        HTMLAttributes: { class: 'bg-black-primary bg-opacity-20 rounded-md' },
      }),
      BulletList.configure({ HTMLAttributes: { class: 'list-disc pl-5' } }),
      OrderedList.configure({ HTMLAttributes: { class: 'list-decimal pl-5' } }),
      ListItem,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          'p-2 rounded-lg outline-none focus:border bg-white h-[150px] overflow-y-auto',
      },
    },
    onUpdate({ editor }) {
      setDescription(editor.getHTML());
    },
  });

  /**
   * Handles form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const formDataObj = Object.fromEntries(formData.entries());
      formDataObj.code_lang = currentCodeLang;
      formDataObj.description = description;

      if (code !== initialCode) {
        formDataObj.code = code;
      }

      await submitHack(formDataObj);

      // Reset form and show success message
      e.target.reset();
      setCode(initialCode);
      setDescription('');
      editor.commands.clearContent();
      toast('Hack submitted! May the code be with you... always.', {
        style: {
          borderRadius: '10px',
          background: '#323643',
          color: '#fff',
        },
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Failed to submit the hack:', error);
    }
  };

  return (
    <>
      <SEO {...{ ...addNewSeo }} />
      <div className="new-trick-page my-5">
        <BackButton />
        <CustomHeading
          heading="Your #1 JavaScript hack?"
          customClasses="!justify-start mt-4"
        />

        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <InputField name="title" label="Title" placeholder="Title" required />

          {/* Description Input (Rich Text Editor) */}
          <div className="mt-7 flex flex-col">
            <label htmlFor="description" className="mb-3">
              <span className="text-sm font-bold">Description</span>
            </label>
            <TextEditor editor={editor} />
          </div>

          {/* Code Editor Input */}
          <div className="mt-7 flex flex-col">
            <label htmlFor="code" className="mb-3">
              <span className="text-sm font-bold">Code</span>
            </label>
            <div className="flex">
              <CodeEditor code={code} handleCodeChange={setCode} />
            </div>
          </div>

          {/* User Name Input */}
          <InputField
            name="user_name"
            label="User Name"
            placeholder="User Name"
            required
            tooltip="For display purposes, eyes only! 👀✨"
          />

          {/* Twitter ID Input */}
          <InputField
            name="twitter_id"
            label="Twitter"
            placeholder="@twitter"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="icon-white mt-6 flex h-[45px] w-full items-center justify-center rounded-lg bg-orange font-bold text-white hover:bg-[#c2410c]"
          >
            Send
            <span className="icon ml-2">
              <SendSvg />
            </span>
          </button>
        </form>
      </div>
    </>
  );
};

export default New;
