import dbConnect from '~/lib/mongodb';
import Hack from '~/models/Hack';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'POST') {
    try {
      const hack = await Hack.findById(id);

      if (!hack) {
        return res.status(404).json({ message: 'Hack not found' });
      }

      // Increment report count
      hack.is_reported += 1;

      // Recalculate offensive score
      hack.offensive_score = parseFloat((hack.is_reported / 5).toFixed(2));

      await hack.save();

      return res.status(200).json({ message: 'Hack reported successfully' });
    } catch (error) {
      console.error('Error reporting hack:', error);
      return res.status(400).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
