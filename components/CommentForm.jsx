import React, { useState } from "react";
import { addCommentToHack, addReplyToComment } from "~/api";
import Tooltip from "./Tooltip";
import WarningSvg from "~/public/icons/warning.svg";
import toast from "react-hot-toast";

const CommentForm = ({
  hackId = "",
  customClasses = "",
  commentId = "",
  type = "comment",
  handleSetCommentData,
  showHeading = true,
}) => {
  const [isCommentBoxFocused, setIsCommentBoxFocused] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const formDataObj = Object.fromEntries(formData.entries());
      let comment;

      if (type === "comment") {
        const res = await addCommentToHack(hackId, formDataObj);
        comment = res.comment;
      } else {
        const res = await addReplyToComment(hackId, commentId, formDataObj);
        comment = res.comment;
      }
      handleSetCommentData(comment, commentId);
      toast("Hooray! A new comment to brighten our day!", {
        style: {
          borderRadius: "10px",
          background: "#323643",
          color: "#fff",
        },
      });
      e.target.reset();
      setIsCommentBoxFocused(false);
    } catch (error) {
      console.error("Failed to submit the hack:", error);
    }
  };

  return (
    <div className={`flex flex-col mt-16 ${customClasses}`}>
      {showHeading && <h1 className="mb-3 text-xl font-bold">Add a Comment</h1>}
      <form onSubmit={handleFormSubmit}>
        <textarea
          required
          name="comment"
          placeholder="Leave your mark... or a joke."
          rows={4}
          className="p-2 w-full rounded-lg outline-none focus:border"
          onFocus={() => setIsCommentBoxFocused(true)}
        />
        {isCommentBoxFocused && (
          <div className="flex gap-x-[15px]">
            <div className="mt-3 flex flex-col justify-start flex-1">
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
                className="p-2 rounded-lg outline-none focus:border"
              />
            </div>
            <div className="mt-3 flex flex-col justify-start flex-1">
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
          </div>
        )}
        <button
          type="submit"
          className="rounded-lg bg-orange hover:bg-[#c2410c] text-white mt-3 w-full h-[45px] font-bold"
        >
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
