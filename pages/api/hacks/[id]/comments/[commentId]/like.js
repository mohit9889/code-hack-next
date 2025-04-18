import dbConnect from '~/lib/mongodb';
import Hack from '~/models/Hack';
import findCommentById from '~/utils/findCommentById';
import { populateComments } from '~/utils/populate';

export default async function handler(req, res) {
  await dbConnect();
  const { id: hackId, commentId } = req.query;

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const hack = await Hack.findById(hackId).populate(populateComments());
    if (!hack) return res.status(404).json({ message: 'Hack not found' });

    const comment = await findCommentById(hack.comments, commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    comment.like_count++;
    await comment.save();

    return res.status(200).json({ message: 'Comment or reply liked' });
  } catch (error) {
    console.error('Like error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
