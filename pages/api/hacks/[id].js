import dbConnect from '~/lib/mongodb';
import Hack from '~/models/Hack';
import { populateComments } from '~/utils/populate';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const hack = await Hack.findById(id).populate(populateComments());
      if (!hack) return res.status(404).json({ message: 'Hack not found' });
      return res.status(200).json(hack);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
