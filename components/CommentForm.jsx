import React, { useState } from 'react';
import { addCommentToHack, addReplyToComment } from '~/api';
import Tooltip from './Tooltip';
import WarningSvg from '~/public/icons/warning.svg';
import toast from 'react-hot-toast';

/**
 * CommentForm Component
 *
 * A form for adding comments or replies to a hack.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.hackId - The ID of the hack to which the comment is being added.
 * @param {string} [props.customClasses] - Custom CSS classes for styling.
 * @param {string} [props.commentId] - The ID of the parent comment if it's a reply.
 * @param {'comment' | 'reply'} [props.type='comment'] - The type of input, either "comment" or "reply".
 * @param {function} props.handleSetCommentData - Function to update the comment list.
 * @param {boolean} [props.showHeading=true] - Determines whether to show the "Add a Comment" heading.
 * @returns {JSX.Element} The CommentForm component.
 */
const CommentForm = ({
  hackId = '',
  customClasses = '',
  commentId = '',
  type = 'comment',
  handleSetCommentData,
  showHeading = true,
}) => {
  const [isCommentBoxFocused, setIsCommentBoxFocused] = useState(false);

  /**
   * Handles the form submission to add a comment or reply.
   *
   * @param {React.FormEvent} e - The form submit event.
   */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const formDataObj = Object.fromEntries(formData.entries());
      let comment;

      if (type === 'comment') {
        const res = await addCommentToHack(hackId, formDataObj);
        comment = res.comment;
      } else {
        const res = await addReplyToComment(hackId, commentId, formDataObj);
        comment = res.comment;
      }

      // Update comment data in the parent component
      handleSetCommentData(comment, commentId);

      // Show success notification
      toast.success('Hooray! A new comment to brighten our day!', {
        style: {
          borderRadius: '10px',
          background: '#323643',
          color: '#fff',
        },
      });

      e.target.reset();
      setIsCommentBoxFocused(false);
    } catch (error) {
      console.error('Failed to submit the comment:', error);
      toast.error('Oops! Something went wrong. Try again later.');
    }
  };

  return (
    <div className={`mt-16 flex flex-col ${customClasses}`}>
      {showHeading && <h2 className="mb-3 text-xl font-bold">Add a Comment</h2>}
      <form onSubmit={handleFormSubmit}>
        <textarea
          required
          name="comment"
          placeholder="Leave your mark... or a joke."
          rows={4}
          className="w-full rounded-lg p-2 outline-none focus:border"
          onFocus={() => setIsCommentBoxFocused(true)}
        />
        {isCommentBoxFocused && (
          <div className="flex flex-col gap-x-4 md:flex-row">
            {/* User Name Input */}
            <div className="mt-3 flex flex-1 flex-col">
              <label htmlFor="user_name" className="flex justify-between">
                <span className="flex">
                  <span className="text-sm">User Name</span>
                  <span className="text-2xl text-orange">*</span>
                </span>
                <Tooltip text="For display purposes, eyes only! 👀✨">
                  <span className="icon-15 animate-blinkingBg cursor-pointer">
                    <WarningSvg />
                  </span>
                </Tooltip>
              </label>
              <input
                name="user_name"
                type="text"
                placeholder="User Name"
                className="rounded-lg p-2 outline-none focus:border"
                required
              />
            </div>

            {/* Twitter Handle Input */}
            <div className="mt-3 flex flex-1 flex-col">
              <label htmlFor="twitter_id" className="mb-3">
                <span className="text-sm">Twitter</span>
              </label>
              <input
                name="twitter_id"
                type="text"
                placeholder="@twitter"
                className="rounded-lg p-2 outline-none focus:border"
              />
            </div>
          </div>
        )}
        <button
          type="submit"
          className="mt-3 h-[45px] w-full rounded-lg bg-orange font-bold text-white hover:bg-[#c2410c]"
        >
          {type === 'comment' ? 'Add Comment' : 'Reply'}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
