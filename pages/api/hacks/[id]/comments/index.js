import dbConnect from '~/lib/mongodb';
import Hack from '~/models/Hack';
import Comment from '~/models/Comment';
import findCommentById from '~/utils/findCommentById';
import { populateComments } from '~/utils/populate';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const hack = await Hack.findById(id)
        .populate(populateComments())
        .select('comments');
      if (!hack) return res.status(404).json({ message: 'Hack not found' });

      const sortedComments = hack.comments.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      return res.status(200).json(sortedComments);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    const { comment, user_name, twitter_id, replyTo } = req.body;

    try {
      const hack = await Hack.findById(id).populate(populateComments());
      if (!hack) return res.status(404).json({ message: 'Hack not found' });

      const newComment = new Comment({
        comment,
        user_name,
        twitter_id,
        like_count: 0,
        replies: [],
        hackId: hack._id,
      });

      await newComment.save();

      if (replyTo) {
        const parentComment = await findCommentById(hack.comments, replyTo);
        if (!parentComment)
          return res.status(404).json({ message: 'Parent comment not found' });

        parentComment.replies.push(newComment._id);
        await parentComment.save();
      } else {
        hack.comments.push(newComment._id);
      }

      hack.comment_count += 1;
      await hack.save();

      return res
        .status(200)
        .json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
      console.error('Error adding comment:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
