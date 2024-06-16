import React, { useState } from "react";
import dynamic from "next/dynamic";
import { submitHack } from "~/api";
import SEO from "~/components/SEO";
import { addNewSeo } from "~/utils/seo";
import { initialCode, languages } from "~/utils/utilities";
import SendSvg from "~/public/icons/send.svg";
import WarningSvg from "~/public/icons/warning.svg";
import toast from "react-hot-toast";

const Heading = dynamic(() =>
  import(
    /* webpackChunkName: "Heading" */
    "~/components/Heading"
  )
);
const BackButton = dynamic(() =>
  import(
    /* webpackChunkName: "BackButton" */
    "~/components/BackButton"
  )
);
const CodeEditor = dynamic(() =>
  import(
    /* webpackChunkName: "CodeEditor" */
    "~/components/CodeEditor"
  )
);
const Tooltip = dynamic(() =>
  import(
    /* webpackChunkName: "Tooltip" */
    "~/components/Tooltip"
  )
);
const TextEditor = dynamic(() =>
  import(
    /* webpackChunkName: "TextEditor" */
    "~/components/TextEditor"
  )
);

const New = () => {
  const currentCodeLang = languages[0].name.toLowerCase();
  const [code, setCode] = useState(initialCode);
  const [description, setDescription] = useState("");

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

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
      // Reset the form after successful submission
      e.target.reset();
      setCode(initialCode);
      setDescription("");
      toast("Hack submitted! May the code be with you... always.", {
        style: {
          borderRadius: "10px",
          background: "#323643",
          color: "#fff",
        },
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Failed to submit the hack:", error);
    }
  };

  return (
    <>
      <SEO {...{ ...addNewSeo }} />
      <div className="new-trick-page my-5">
        <BackButton />
        <Heading
          heading="Your #1 JavaScript hack?"
          customClasses="!justify-start mt-4"
        />
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mt-7 flex flex-col">
            <label htmlFor="title" className="flex">
              <span className="text-sm">Title</span>
              <span className="text-orange text-2xl">*</span>
            </label>
            <input
              name="title"
              type="text"
              placeholder="Title"
              required
              className="p-2 rounded-lg outline-none focus:border"
            />
          </div>
          {/* Description */}
          <div className="mt-7 flex flex-col">
            <label htmlFor="description" className="mb-3">
              <span className="text-sm">Description</span>
            </label>
            {/* <textarea
              name="description"
              placeholder="Description"
              rows={4}
              className="p-2 rounded-lg outline-none focus:border"
            /> */}
            <TextEditor
              description={description}
              setDescription={setDescription}
            />
          </div>
          {/* Code Editor */}
          <div className="mt-7 flex flex-col">
            <label htmlFor="description" className="mb-3">
              <span className="text-sm">Code</span>
            </label>
            <div className="flex">
              <CodeEditor code={code} handleCodeChange={handleCodeChange} />
            </div>
          </div>
          {/* User Name */}
          <div className="mt-7 flex flex-col justify-start">
            <label htmlFor="user_name" className="flex justify-between">
              <span className="flex">
                <span className="text-sm">User Name</span>
                <span className="text-orange text-2xl">*</span>
              </span>
              <Tooltip text="For display purposes, eyes only! 👀✨">
                <span className="icon-15 cursor-pointer animate-blinkingBg">
                  <WarningSvg />
                </span>
              </Tooltip>
            </label>
            <input
              name="user_name"
              type="text"
              placeholder="User Name"
              required
              className="p-2 rounded-lg outline-none focus:border"
            />
          </div>
          {/* Twitter ID */}
          <div className="mt-7 flex flex-col justify-start">
            <label htmlFor="twitter_id" className="mb-3 flex">
              <span className="text-sm">Twitter</span>
            </label>
            <input
              name="twitter_id"
              type="text"
              placeholder="@twitter"
              className="p-2 rounded-lg outline-none focus:border"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-orange hover:bg-[#c2410c] text-white mt-6 w-full h-[45px] font-bold flex justify-center items-center icon-white"
          >
            Send
            <span className="ml-2 icon">
              <SendSvg />
            </span>
          </button>
        </form>
      </div>
    </>
  );
};

export default New;
