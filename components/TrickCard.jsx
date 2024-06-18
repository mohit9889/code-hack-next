import { useState } from "react";
import Link from "next/link";
import { reportHack } from "~/api";
import ShareButton from "./Share";
import LikeDisLike from "./LikeDisLike";
import { getTrickURL, formatDate } from "~/utils/utilities";
import EyeSvg from "~/public/icons/eye.svg";
import StopSvg from "~/public/icons/stop.svg";
import toast from "react-hot-toast";

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
    offensive_score <= 1 ? false : true,
  );
  const url = getTrickURL(title, id);

  const handleReportHack = async () => {
    try {
      await reportHack(id);
      setIsHackReported(true);
      toast("Hack reported! Our coding detectives are on the case.", {
        style: {
          borderRadius: "10px",
          background: "#323643",
          color: "#fff",
        },
      });
    } catch (error) {
      console.log("Error while reporting Hack!", error);
      setIsHackReported(false);
    }
  };

  return (
    <div className="relative rounded-lg shadow-lg">
      <div className="bg-white rounded-lg p-4 flex justify-between">
        <div className="flex flex-col justify-between">
          {/* Title */}
          <Link
            as={`trick/${url}`}
            href={{ pathname: "trick/[trick]", query: { id } }}
          >
            <div className="flex items-start">
              <span className="mr-2 text-xl font-bold opacity-75">
                {index}.
              </span>
              <h2 className="font-semibold hover:opacity-75 leading-7">
                {title}
              </h2>
            </div>
          </Link>
          {/* Extra Details */}
          <div className="flex text-xs opacity-70 mt-2 flex-wrap">
            <span>
              By {twitter_id ? twitter_id : user_name} on{" "}
              {formatDate(created_at)}
            </span>
            <span className="mx-1">|</span>
            <span>
              {comment_count} {comment_count > 1 ? "comments" : "comment"}
            </span>
            <span className="mx-1">|</span>
            <button
              onClick={handleReportHack}
              disabled={isHackReported}
              className={`${
                isHackReported
                  ? " cursor-not-allowed text-orange"
                  : "cursor-pointer hover:text-orange"
              }`}
            >
              {isHackReported ? "Reported" : "Report"}
            </button>
            <span className="mx-1">|</span>
            <ShareButton
              url={`trick/${url}`}
              customClass="cursor-pointer hover:text-orange"
            />
          </div>
        </div>
        {/* Like Dislike */}
        <LikeDisLike key={id} likeCount={like_count} trickId={id} />
      </div>
      {showOffensiveHack && (
        <div className="absolute top-0 left-0 rounded-lg w-full h-full flex flex-col items-center justify-center backdrop-blur-sm">
          <span className="text-center flex items-center">
            <span className="icon-20 mr-2">
              <StopSvg />
            </span>
            Oops, hack took a wrong turn.
          </span>
          <button
            onClick={() => setShowOffensiveHack(false)}
            className="flex items-center border-2 px-2 py-1 rounded-lg font-bold mt-3 hover:bg-black-primary hover:bg-opacity-10"
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
