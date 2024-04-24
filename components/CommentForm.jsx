import React, { useState } from "react";
import { addCommentToHack, addReplyToComment } from "~/api";

const CommentForm = ({
  hackId = "",
  customClasses = "",
  commentId = "",
  type = "comment",
}) => {
  const [isCommentBoxFocused, setIsCommentBoxFocused] = useState(false);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const formDataObj = Object.fromEntries(formData.entries());
      await addCommentToHack(hackId, formDataObj);
    } catch (error) {
      console.error("Failed to submit the hack:", error);
    }
  };

  const handleSubmitCommentReply = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const formDataObj = Object.fromEntries(formData.entries());
      await addReplyToComment(hackId, commentId, formDataObj);
    } catch (error) {
      console.error("Failed to submit the hack:", error);
    }
  };

  return (
    <div className={`flex flex-col mt-16 ${customClasses}`}>
      <form
        onSubmit={(e) =>
          type === "comment"
            ? handleSubmitComment(e)
            : handleSubmitCommentReply(e)
        }
      >
        <textarea
          name="comment"
          placeholder="Want to something?"
          rows={4}
          className="p-2 w-full rounded-lg outline-none focus:border"
          onFocus={() => setIsCommentBoxFocused(true)}
        />
        {isCommentBoxFocused && (
          <div className="flex gap-x-[15px]">
            <div className="mt-7 flex flex-col justify-start flex-1">
              <label htmlFor="user_name" className="flex">
                <span className="text-sm">User Name</span>
                <span className="text-orange text-2xl">*</span>
              </label>
              <input
                name="user_name"
                type="text"
                placeholder="User Name"
                className="p-2 rounded-lg outline-none focus:border"
              />
            </div>
            <div className="mt-7 flex flex-col justify-start flex-1">
              <label htmlFor="twitter_id" className="mb-3 flex">
                <span className="text-sm">Twitter</span>
              </label>
              <input
                name="twitter_id"
                type="text"
                placeholder="@Twitter"
                className="p-2 rounded-lg outline-none focus:border"
              />
            </div>
          </div>
        )}
        <button
          type="submit"
          className="rounded-lg bg-orange hover:bg-[#c2410c] text-white mt-6 w-full h-[45px] font-bold"
        >
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
