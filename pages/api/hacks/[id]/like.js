import dbConnect from '~/lib/mongodb';
import Hack from '~/models/Hack';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'POST') {
    try {
      await Hack.findByIdAndUpdate(id, { $inc: { like_count: 1 } });
      return res.status(200).json({ message: 'Like added' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
