import React, { useState } from "react";
import { likeHack, dislikeHack, likeComment, dislikeComment } from "~/api";
import LikeSvg from "~/public/icons/like.svg";
import DislikeSvg from "~/public/icons/dislike.svg";

const LikeDisLike = ({
  trickId = "",
  likeCount = 0,
  type = "hack",
  commentId = "",
  customClasses = "",
}) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likedCountState, setLikedCountState] = useState(likeCount);

  const handleLike = async () => {
    if (!liked) {
      setLiked(true);
      setDisliked(false);
      setLikedCountState(likedCountState + 1);
      if (type === "hack") await likeHack(trickId);
      else await likeComment(trickId, commentId);
    }
  };

  const handleDislike = async () => {
    if (!disliked) {
      setLiked(false);
      setDisliked(true);
      setLikedCountState(likedCountState - 1);
      if (type === "hack") await dislikeHack(trickId);
      else await dislikeComment(trickId, commentId);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center icon-15">
      <span
        onClick={handleLike}
        className={`icon-green cursor-pointer hover:bg-black-primary rounded-lg hover:bg-opacity-20 px-2 py-1 ${
          liked ? "text-green-500" : ""
        } ${type === "hack" ? "icon" : "icon-15"}`}
      >
        <LikeSvg />
      </span>
      <span className={type === "hack" ? "" : "text-sm"}>
        {likedCountState}
      </span>
      <span
        onClick={handleDislike}
        className={`icon-red cursor-pointer hover:bg-black-primary rounded-lg hover:bg-opacity-20 px-2 py-1 ${
          disliked ? "text-red-500" : ""
        } ${type === "hack" ? "icon" : "icon-15"}`}
      >
        <DislikeSvg />
      </span>
    </div>
  );
};

export default LikeDisLike;
