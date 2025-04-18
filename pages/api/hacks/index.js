import dbConnect from '~/lib/mongodb';
import Hack from '~/models/Hack';
import { populateComments } from '~/utils/populate';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const hacks = await Hack.find().populate(populateComments());
      return res.status(200).json(hacks);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const newHack = new Hack(req.body);
      await newHack.save();
      return res.status(200).json({ message: 'Your Hack is saved!' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
