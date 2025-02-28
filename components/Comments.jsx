import React, { useState } from 'react';
import CommentForm from './CommentForm';
import LikeDisLike from './LikeDisLike';
import { formatDate } from '~/utils/utilities';

/**
 * Comment Component
 *
 * Renders an individual comment with like/dislike, reply options, and nested replies.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.comment - Comment data object
 * @param {string} props.hackId - The ID of the hack associated with the comment
 * @param {function} props.handleSetCommentData - Function to update comments
 * @param {boolean} [props.showReplyBox=true] - Determines if the reply and expand buttons are shown
 * @returns {JSX.Element} The Comment component.
 */
const Comment = ({
  comment: commentData,
  hackId,
  handleSetCommentData,
  showReplyBox = true,
}) => {
  const {
    comment,
    user_name,
    createdAt,
    twitter_id,
    replies = [],
    like_count,
    _id: commentId,
  } = commentData;

  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);

  return (
    <>
      <div className="flex">
        {/* Like/Dislike Component */}
        <LikeDisLike
          likeCount={like_count}
          commentId={commentId}
          trickId={hackId}
          type="comment"
          customClasses=""
        />
        <div className="ml-2 flex flex-col justify-between">
          <span>{comment}</span>
          <div className="flex items-center">
            <span className="text-xs opacity-50">
              By {twitter_id || user_name} on {formatDate(createdAt)}
            </span>
            {showReplyBox && (
              <>
                {/* Toggle Replies */}
                <button
                  onClick={() => setIsCommentOpen((prev) => !prev)}
                  className="ml-6 rounded-lg px-2 py-1 text-sm hover:bg-black-primary/30"
                >
                  [{replies.length} More]
                </button>

                {/* Toggle Reply Form */}
                <button
                  onClick={() => {
                    setIsReplyFormOpen((prev) => !prev);
                    setIsCommentOpen(true);
                  }}
                  className="ml-6 rounded-lg px-2 py-1 text-sm hover:bg-black-primary/30"
                >
                  Reply
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Reply Form & Nested Replies */}
      <div className="ml-8 mt-2">
        {isReplyFormOpen && (
          <CommentForm
            customClasses="!my-3"
            hackId={hackId}
            commentId={commentId}
            type="reply"
            handleSetCommentData={handleSetCommentData}
            showHeading={false}
          />
        )}

        {replies.length > 0 &&
          isCommentOpen &&
          replies.map((reply, index) => (
            <Comment
              key={index}
              comment={reply}
              hackId={hackId}
              showReplyBox={false}
            />
          ))}
      </div>
    </>
  );
};

/**
 * Comments Component
 *
 * Displays a list of comments for a hack.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.commentsData - List of comment objects
 * @param {string} [props.hackId=''] - The ID of the hack associated with the comments
 * @param {function} props.handleSetCommentData - Function to update comments
 * @returns {JSX.Element} The Comments component.
 */
const Comments = ({ commentsData = [], hackId = '', handleSetCommentData }) => {
  return (
    <div className="my-7">
      <h2 className="mb-3 text-xl font-bold">Comments</h2>
      {commentsData.length > 0 ? (
        commentsData.map((comment, index) => (
          <div key={index}>
            <Comment
              hackId={hackId}
              comment={comment}
              handleSetCommentData={handleSetCommentData}
            />
            <hr className="my-4 opacity-0" />
          </div>
        ))
      ) : (
        <p className="font-medium">
          Comments MIA, jokes needed ASAP. Add yours! 😄
        </p>
      )}
    </div>
  );
};

export default Comments;
