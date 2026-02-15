import { apiHandler } from '~/lib/api-handler';
import Hack from '~/models/Hack';
import { populateComments } from '~/utils/populate';

export default apiHandler({
  GET: async (req, res) => {
    const hacks = await Hack.find()
      .sort({ most_visited: -1 })
      // .limit(50)
      .populate(populateComments());
    return res.status(200).json(hacks);
  },
});
