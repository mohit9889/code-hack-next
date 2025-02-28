import { useState } from 'react';
import Link from 'next/link';
import { reportHack } from '~/api';
import ShareButton from './Share';
import LikeDisLike from './LikeDisLike';
import { getTrickURL, formatDate } from '~/utils/utilities';
import EyeSvg from '~/public/icons/eye.svg';
import StopSvg from '~/public/icons/stop.svg';
import toast from 'react-hot-toast';

/**
 * TrickCard Component
 *
 * Displays an individual trick card with details, like/dislike, sharing, and reporting functionality.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {number} props.index - Index number of the trick
 * @param {Object} props.trick - Trick object containing details
 * @param {string} props.trick._id - Unique ID of the trick
 * @param {string} props.trick.title - Title of the trick
 * @param {string} props.trick.user_name - Name of the user who posted
 * @param {string} [props.trick.twitter_id] - Twitter ID of the user (if available)
 * @param {string} props.trick.createdAt - Date when the trick was created
 * @param {number} props.trick.comment_count - Number of comments
 * @param {number} props.trick.like_count - Number of likes
 * @param {number} props.trick.offensive_score - Score indicating offensive content
 * @returns {JSX.Element} - The rendered TrickCard component
 */
const TrickCard = ({ index, trick = {} }) => {
  const {
    _id: id,
    title,
    user_name,
    twitter_id,
    createdAt: created_at,
    comment_count,
    like_count,
    offensive_score,
  } = trick;

  const [isHackReported, setIsHackReported] = useState(false);
  const [showOffensiveHack, setShowOffensiveHack] = useState(
    offensive_score > 1
  );
  const url = getTrickURL(title, id);

  /**
   * Handles reporting a hack.
   * Sets the state to indicate the trick has been reported and shows a toast notification.
   */
  const handleReportHack = async () => {
    try {
      await reportHack(id);
      setIsHackReported(true);
      toast.success('Hack reported! Our coding detectives are on the case.', {
        style: {
          borderRadius: '10px',
          background: '#323643',
          color: '#fff',
        },
      });
    } catch (error) {
      console.error('Error while reporting Hack!', error);
      toast.error('Failed to report hack. Try again later.');
      setIsHackReported(false);
    }
  };

  return (
    <div className="relative rounded-lg shadow-lg">
      {/* Trick Details */}
      <div className="flex justify-between rounded-lg bg-white p-4">
        <div className="flex flex-col justify-between">
          {/* Trick Title */}
          <Link
            as={`trick/${url}`}
            href={{ pathname: 'trick/[trick]', query: { id } }}
          >
            <div className="flex items-start">
              <span className="mr-2 text-xl font-bold opacity-75">
                {index}.
              </span>
              <h2 className="font-semibold leading-7 hover:opacity-75">
                {title}
              </h2>
            </div>
          </Link>

          {/* Extra Trick Details */}
          <div className="mt-2 flex flex-wrap text-xs opacity-70">
            <span>
              By {twitter_id || user_name} on {formatDate(created_at)}
            </span>
            <span className="mx-1">|</span>
            <span>
              {comment_count} {comment_count === 1 ? 'comment' : 'comments'}
            </span>
            <span className="mx-1">|</span>

            {/* Report Hack Button */}
            <button
              onClick={handleReportHack}
              disabled={isHackReported}
              className={`${
                isHackReported
                  ? 'cursor-not-allowed text-orange'
                  : 'cursor-pointer hover:text-orange'
              }`}
            >
              {isHackReported ? 'Reported' : 'Report'}
            </button>

            <span className="mx-1">|</span>

            {/* Share Button */}
            <ShareButton
              url={`trick/${url}`}
              customClass="cursor-pointer hover:text-orange"
            />
          </div>
        </div>

        {/* Like/Dislike Component */}
        <LikeDisLike key={id} likeCount={like_count} trickId={id} />
      </div>

      {/* Offensive Content Warning */}
      {showOffensiveHack && (
        <div className="absolute left-0 top-0 flex size-full flex-col items-center justify-center rounded-lg backdrop-blur-sm">
          <span className="flex items-center text-center">
            <span className="icon-20 mr-2">
              <StopSvg />
            </span>
            Oops, this hack took a wrong turn.
          </span>
          <button
            onClick={() => setShowOffensiveHack(false)}
            className="mt-3 flex items-center rounded-lg border-2 px-2 py-1 font-bold hover:bg-black-primary/10"
          >
            <span className="icon mr-2 hover:text-white">
              <EyeSvg />
            </span>
            Show Anyway
          </button>
        </div>
      )}
    </div>
  );
};

export default TrickCard;
