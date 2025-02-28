import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getSingleTrickData, reportHack, visitedHack } from '~/api';
import SEO from '~/components/SEO';
import {
  getFromSessionStorage,
  saveToSessionStorage,
} from '~/utils/sessionStorage';
import { trickSeo } from '~/utils/seo';
import { formatDate, getTrickURL } from '~/utils/utilities';
import toast from 'react-hot-toast';

// Dynamically import components for performance optimization
const Heading = dynamic(() => import('~/components/Heading'));
const BackButton = dynamic(() => import('~/components/BackButton'));
const CodeDisplay = dynamic(() => import('~/components/CodeDisplay'));
const ShareButton = dynamic(() => import('~/components/Share'));
const LikeDisLike = dynamic(() => import('~/components/LikeDisLike'));
const CommentForm = dynamic(() => import('~/components/CommentForm'));
const Comments = dynamic(() => import('~/components/Comments'));

const Trick = ({ trickData = {} }) => {
  const {
    _id: id,
    title,
    description,
    user_name,
    twitter_id,
    createdAt,
    comment_count,
    like_count,
    code,
    code_lang,
    comments,
  } = trickData;

  const [isHackReported, setIsHackReported] = useState(false);
  const [commentsData, setCommentsData] = useState(comments);

  useEffect(() => {
    const trackVisit = async () => {
      const visitedHacks = getFromSessionStorage('visited_hacks') || [];
      if (!visitedHacks.includes(id)) {
        await visitedHack(id);
        saveToSessionStorage('visited_hacks', [...visitedHacks, id]);
      }
    };
    trackVisit();
  }, [id]);

  const handleReportHack = async () => {
    try {
      await reportHack(id);
      setIsHackReported(true);
      toast.success('Hack reported! Our coding detectives are on the case.');
    } catch (error) {
      console.error('Error reporting hack:', error);
      toast.error('Failed to report hack. Try again later.');
    }
  };

  const updateComments = (newComment, commentId = '') => {
    setCommentsData((prevComments) => {
      if (commentId) {
        return prevComments.map((comment) =>
          comment._id === commentId
            ? { ...comment, replies: [newComment, ...comment.replies] }
            : comment
        );
      }
      return [newComment, ...prevComments];
    });
  };

  return (
    <>
      <SEO title={title} {...trickSeo} />
      <div className="my-5">
        <BackButton />
        <div className="mb-4 mt-3 rounded-lg bg-white p-3">
          <div className="flex justify-between">
            <div>
              <Heading
                heading={title}
                customClasses="!justify-start"
                headingClasses="!text-left"
              />
              <div className="mt-2 flex flex-wrap text-xs opacity-70">
                <span>
                  By {twitter_id || user_name} on {formatDate(createdAt)}
                </span>
                <span className="mx-1">|</span>
                <span>
                  {comment_count} {comment_count > 1 ? 'comments' : 'comment'}
                </span>
                <span className="mx-1">|</span>
                <button
                  onClick={handleReportHack}
                  disabled={isHackReported}
                  className={`hover:text-orange ${isHackReported ? '!cursor-not-allowed text-orange' : ''}`}
                >
                  {isHackReported ? 'Reported' : 'Report'}
                </button>
                <span className="mx-1">|</span>
                <ShareButton
                  url={`trick/${getTrickURL(title, id)}`}
                  customClass="cursor-pointer hover:text-orange"
                />
              </div>
            </div>
            <LikeDisLike likeCount={like_count} trickId={id} />
          </div>
          <div
            className="content mt-3"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        {code && <CodeDisplay code={code} language={code_lang} />}
        <CommentForm
          hackId={id}
          type="comment"
          handleSetCommentData={updateComments}
        />
        <Comments
          hackId={id}
          commentsData={commentsData}
          handleSetCommentData={updateComments}
        />
      </div>
    </>
  );
};

export default Trick;

export async function getServerSideProps({ query }) {
  const id = query.trick.split('-').pop();
  const res = await getSingleTrickData(id);

  if (res.status === 404) {
    return { redirect: { destination: '/404', permanent: false } };
  }

  return { props: { trickData: res } };
}
