import { apiHandler } from '~/lib/api-handler';
import { getNewHacks } from '~/lib/hacks-controller';

export default apiHandler({
  GET: async (req, res) => {
    const hacks = await getNewHacks();
    return res.status(200).json(hacks);
  },
});
