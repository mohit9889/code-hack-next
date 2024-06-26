/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getSingleTrickData, reportHack, visitedHack } from "~/api";
import SEO from "~/components/SEO";
import {
  getFromSessionStorage,
  saveToSessionStorage,
} from "~/utils/sessionStorage";
import { trickSeo } from "~/utils/seo";
import { formatDate, getTrickURL } from "~/utils/utilities";
import toast from "react-hot-toast";

const Heading = dynamic(
  () =>
    import(
      /* webpackChunkName: "Heading" */
      "~/components/Heading"
    ),
);
const BackButton = dynamic(
  () =>
    import(
      /* webpackChunkName: "BackButton" */
      "~/components/BackButton"
    ),
);
const CodeDisplay = dynamic(
  () =>
    import(
      /* webpackChunkName: "CodeDisplay" */
      "~/components/CodeDisplay"
    ),
);
const ShareButton = dynamic(
  () =>
    import(
      /* webpackChunkName: "ShareButton" */
      "~/components/Share"
    ),
);
const LikeDisLike = dynamic(
  () =>
    import(
      /* webpackChunkName: "LikeDisLike" */
      "~/components/LikeDisLike"
    ),
);
const CommentForm = dynamic(
  () =>
    import(
      /* webpackChunkName: "CommentForm" */
      "~/components/CommentForm"
    ),
);
const Comments = dynamic(
  () =>
    import(
      /* webpackChunkName: "Comments" */
      "~/components/Comments"
    ),
);

const Trick = ({ trickData = {} }) => {
  const {
    _id: id,
    title,
    description,
    user_name,
    twitter_id,
    createdAt: created_at,
    comment_count,
    like_count,
    code,
    code_lang,
    comments,
  } = trickData;

  const url = getTrickURL(title, id);
  const [isHackReported, setIsHackReported] = useState(false);
  const [commentsData, setCommentsData] = useState(comments);

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

  const handleSetCommentData = (newComment, commentId = "") => {
    const updatedComments = [...commentsData];

    if (commentId) {
      const commentIndex = updatedComments.findIndex(
        (c) => c._id === commentId,
      );
      if (commentIndex !== -1) {
        updatedComments[commentIndex].replies = [
          newComment,
          ...updatedComments[commentIndex].replies,
        ];
      }
    } else {
      updatedComments.unshift(newComment);
    }
    setCommentsData(updatedComments);
  };

  const hackVisited = async () => {
    const res = await visitedHack(id);
  };

  useEffect(() => {
    const visitedHack = getFromSessionStorage("visited_hacks") || [];
    if (!visitedHack.includes(id)) {
      hackVisited(id);
      saveToSessionStorage("visited_hacks", [...visitedHack, id]);
    }
  }, []);

  return (
    <>
      <SEO title={title} {...{ ...trickSeo }} />
      <div className="my-5">
        {/* Back Button */}
        <BackButton />

        {/* Trick Content */}
        <div className="bg-white p-3 rounded-lg mb-4 mt-3">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <Heading
                heading={title}
                customClasses="!justify-start"
                headingClasses="!text-left"
              />
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
                      ? " !cursor-not-allowed text-orange"
                      : "hover:text-orange"
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
            <LikeDisLike likeCount={like_count} trickId={id} />
          </div>
          {/*   <p className="mt-3">{description}</p> */}
          <div
            className="mt-3 content"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        {/* Display code */}
        {code && <CodeDisplay code={code} language={code_lang} />}

        {/* Comment Form */}
        <CommentForm
          hackId={id}
          type="comment"
          handleSetCommentData={handleSetCommentData}
        />

        {/* Comments */}
        <Comments
          key={commentsData}
          hackId={id}
          commentsData={commentsData}
          handleSetCommentData={handleSetCommentData}
        />
      </div>
    </>
  );
};

export default Trick;

export async function getServerSideProps(context) {
  const {
    query: { trick },
  } = context;
  const id = trick.substring(trick.lastIndexOf("-") + 1);

  const res = await getSingleTrickData(id);

  if (res.status === 404) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return { props: { trickData: res } };
}
