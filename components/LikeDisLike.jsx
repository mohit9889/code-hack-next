import React, { useState } from 'react';
import { likeHack, dislikeHack, likeComment, dislikeComment } from '~/services';
import LikeSvg from '~/public/icons/like.svg';
import DislikeSvg from '~/public/icons/dislike.svg';

/**
 * LikeDisLike Component
 *
 * Handles liking and disliking of hacks and comments with animations.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.trickId=''] - The ID of the hack or trick being liked/disliked
 * @param {number} [props.likeCount=0] - Initial like count
 * @param {string} [props.type='hack'] - Determines if the like/dislike applies to a 'hack' or 'comment'
 * @param {string} [props.commentId=''] - The ID of the comment (only used if type is 'comment')
 * @returns {JSX.Element} The LikeDisLike component.
 */
const LikeDisLike = ({
  trickId = '',
  likeCount = 0,
  type = 'hack',
  commentId = '',
}) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likedCountState, setLikedCountState] = useState(likeCount);
  const [animateLike, setAnimateLike] = useState(false);
  const [animateDislike, setAnimateDislike] = useState(false);

  /**
   * Handles the like action
   */
  const handleLike = async () => {
    if (!liked) {
      setLiked(true);
      setDisliked(false);
      setLikedCountState((prev) => prev + 1);
      setAnimateLike(true);
      setTimeout(() => setAnimateLike(false), 1000);

      if (type === 'hack') {
        await likeHack(trickId);
      } else {
        await likeComment(trickId, commentId);
      }
    }
  };

  /**
   * Handles the dislike action
   */
  const handleDislike = async () => {
    if (!disliked) {
      setLiked(false);
      setDisliked(true);
      setLikedCountState((prev) => prev - 1);
      setAnimateDislike(true);
      setTimeout(() => setAnimateDislike(false), 1000);

      if (type === 'hack') {
        await dislikeHack(trickId);
      } else {
        await dislikeComment(trickId, commentId);
      }
    }
  };

  return (
    <div className="icon-15 flex flex-col items-center justify-center">
      {/* Like Button */}
      <span
        onClick={handleLike}
        className={`icon-green relative cursor-pointer rounded-lg px-2 py-1 hover:bg-black-primary/20 ${
          liked ? 'text-green-500' : ''
        } ${type === 'hack' ? 'icon' : 'icon-15'}`}
      >
        <LikeSvg />
        {animateLike && (
          <div className="absolute top-0 animate-up-and-fade">🎉</div>
        )}
      </span>

      {/* Like Count */}
      <span className={type === 'hack' ? '' : 'text-sm'}>
        {likedCountState}
      </span>

      {/* Dislike Button */}
      <span
        onClick={handleDislike}
        className={`icon-red relative cursor-pointer rounded-lg px-2 py-1 hover:bg-black-primary/20 ${
          disliked ? 'text-red-500' : ''
        } ${type === 'hack' ? 'icon' : 'icon-15'}`}
      >
        <DislikeSvg />
        {animateDislike && (
          <div className="absolute top-0 animate-up-and-fade">😩</div>
        )}
      </span>
    </div>
  );
};

export default LikeDisLike;
