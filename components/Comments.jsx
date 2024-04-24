import React, { useState } from "react";
import CommentForm from "./CommentForm";
import LikeDisLike from "./LikeDisLike";
import { formatDate } from "~/utils/utilities";

const Comment = (props) => {
  const {
    comment,
    user_name,
    createdAt,
    twitter_id,
    replies,
    like_count,
    _id: commentId,
  } = props.comment;
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
  const isParentComment = Boolean(replies && replies.length);

  return (
    <div className="mb-4">
      <div className="flex">
        <LikeDisLike
          likeCount={like_count}
          commentId={commentId}
          trickId={props.hackId}
          type="comment"
        />
        <div className="flex flex-col">
          <span>{comment}</span>
          <div className="flex items-center">
            <span className=" text-xs opacity-50">
              By {twitter_id ? twitter_id : user_name} on{" "}
              {formatDate(createdAt)}
            </span>
            <button
              onClick={() => setIsCommentOpen(!isCommentOpen)}
              className="ml-6 text-sm hover:bg-black-primary hover:bg-opacity-30 rounded-lg px-2 py-1"
            >
              [{replies?.length} More]
            </button>
            <button
              onClick={() => setIsReplyFormOpen(!isReplyFormOpen)}
              className="ml-6 text-sm hover:bg-black-primary hover:bg-opacity-30 rounded-lg px-2 py-1"
            >
              Reply
            </button>
          </div>
        </div>
      </div>
      <div className="ml-16">
        {isReplyFormOpen && (
          <CommentForm
            customClasses="!mt-4"
            hackId={props.hackId}
            commentId={commentId}
            type="reply"
          />
        )}
        {isParentComment && isCommentOpen ? (
          <div className="replies">
            <Comments hackId={props.hackId} commentsData={replies} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

const Comments = ({ commentsData = [], hackId = "" }) => {
  return (
    <div className="my-7">
      {commentsData.map((comment, index) => (
        <Comment key={index} hackId={hackId} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
