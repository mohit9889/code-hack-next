import Link from "next/link";
import ShareButton from "./Share";
import LikeDisLike from "./LikeDisLike";
import { getTrickURL, formatDate } from "~/utils/utilities";

const TrickCard = ({ index, trick = {} }) => {
  const {
    _id: id,
    title,
    user_name,
    twitter_id,
    createdAt: created_at,
    comment_count,
    like_count,
  } = trick;
  const url = getTrickURL(title, id);

  return (
    <div className="bg-white rounded-lg p-4 flex justify-between">
      <div className="flex flex-col justify-between">
        {/* Title */}
        <Link
          as={`trick/${url}`}
          href={{ pathname: "trick/[trick]", query: { id } }}
        >
          <div className="flex items-start">
            <span className="mr-2 text-xl font-bold opacity-75">{index}.</span>
            <h4 className="font-semibold hover:opacity-75 leading-7">
              {title}
            </h4>
          </div>
        </Link>
        {/* Extra Details */}
        <div className="flex text-xs opacity-70 mt-2 flex-wrap">
          <span>
            By {twitter_id ? twitter_id : user_name} on {formatDate(created_at)}
          </span>
          <span className="mx-1">|</span>
          <span>
            {comment_count} {comment_count > 1 ? "comments" : "comment"}
          </span>
          <span className="mx-1">|</span>
          <span className=" cursor-pointer hover:text-orange ">Report</span>
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
  );
};

export default TrickCard;
