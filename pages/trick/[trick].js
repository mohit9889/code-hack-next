import React from "react";
import { getSingleTrickData } from "~/api";
import Heading from "~/components/Heading";
import BackButton from "~/components/BackButton";
import CodeDisplay from "~/components/CodeDisplay";
import ShareButton from "~/components/Share";
import LikeDisLike from "~/components/LikeDisLike";
import CommentForm from "~/components/CommentForm";
import Comments from "~/components/Comments";
import { formatDate, getTrickURL } from "~/utils/utilities";

const Trick = ({ trickData = {} }) => {
  const {
    _id: id,
    title,
    description,
    user_name,
    twitter_id,
    created_at,
    comment_count,
    like_count,
    code,
    code_lang,
    comments: commentsData,
  } = trickData;

  const url = getTrickURL(title, id);

  return (
    <div className="my-5">
      {/* Back Button */}
      <BackButton />

      {/* Trick Content */}
      <div className="bg-white p-3 rounded-lg mb-4 mt-3">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <Heading heading={title} customClasses="!justify-start" />
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
              <span className=" cursor-pointer hover:text-orange ">Report</span>
              <span className="mx-1">|</span>
              <ShareButton
                url={`trick/${url}`}
                customClass="cursor-pointer hover:text-orange"
              />
            </div>
          </div>
          <LikeDisLike likeCount={like_count} trickId={id} />
        </div>
        <p className="mt-3">{description}</p>
      </div>

      {/* Display code */}
      <CodeDisplay code={code} language={code_lang} />

      {/* Comment Form */}
      <CommentForm hackId={id} type="comment" />

      {/* Comments */}
      <Comments hackId={id} commentsData={commentsData} />
    </div>
  );
};

export default Trick;

export async function getServerSideProps(context) {
  const {
    query: { trick },
  } = context;
  const id = trick.substring(trick.lastIndexOf("-") + 1);

  const res = await getSingleTrickData(id);

  return { props: { trickData: res } };
}
