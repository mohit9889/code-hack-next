import { apiHandler } from '~/lib/api-handler';
import { createHackSchema } from '~/lib/validations';
import Hack from '~/models/Hack';
import { populateComments } from '~/utils/populate';

export default apiHandler({
  GET: async (req, res) => {
    const hacks = await Hack.find().populate(populateComments());
    return res.status(200).json(hacks);
  },
  POST: async (req, res) => {
    const data = createHackSchema.parse(req.body);
    const newHack = new Hack(data);
    await newHack.save();
    return res.status(200).json({ message: 'Your Hack is saved!' });
  },
});
