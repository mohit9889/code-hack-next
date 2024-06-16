import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import LikeDisLike from "./LikeDisLike";
import { formatDate } from "~/utils/utilities";

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
    replies,
    like_count,
    _id: commentId,
  } = commentData;
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
  const isParentComment = Boolean(replies && replies.length);

  return (
    <>
      <div className="flex">
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
            <span className=" text-xs opacity-50">
              By {twitter_id ? twitter_id : user_name} on{" "}
              {formatDate(createdAt)}
            </span>
            {showReplyBox && (
              <>
                <button
                  onClick={() => {
                    setIsCommentOpen(!isCommentOpen);
                  }}
                  className="ml-6 text-sm hover:bg-black-primary hover:bg-opacity-30 rounded-lg px-2 py-1"
                >
                  [{replies?.length} More]
                </button>
                <button
                  onClick={() => {
                    setIsReplyFormOpen(!isReplyFormOpen);
                    setIsCommentOpen(true);
                  }}
                  className="ml-6 text-sm hover:bg-black-primary hover:bg-opacity-30 rounded-lg px-2 py-1"
                >
                  Reply
                </button>
              </>
            )}
          </div>
        </div>
      </div>
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
        {/* {isParentComment && isCommentOpen ? (
          <div className="replies">
            <Comments
              hackId={hackId}
              commentsData={replies}
              handleSetCommentData={handleSetCommentData}
            />
          </div>
        ) : null} */}
        {replies.length > 0 && isCommentOpen
          ? replies.map((reply, index) => (
              <Comment
                key={index}
                comment={reply}
                hackId={hackId}
                showReplyBox={false}
              />
            ))
          : null}
      </div>
    </>
  );
};

const Comments = ({ commentsData = [], hackId = "", handleSetCommentData }) => {
  return (
    <div className="my-7">
      <h2 className="mb-3 text-xl font-bold">Comments</h2>
      {commentsData.length > 0 ? (
        commentsData.map((comment, index) => (
          <>
            <div key={index}>
              <Comment
                hackId={hackId}
                comment={comment}
                handleSetCommentData={handleSetCommentData}
              />
            </div>
            <hr className="opacity-0 my-4" />
          </>
        ))
      ) : (
        <p className=" font-medium">
          Comments MIA, jokes needed ASAP. Add yours! 😄
        </p>
      )}
    </div>
  );
};

export default Comments;
