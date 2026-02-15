import { apiHandler } from '~/lib/api-handler';
import { getTopHacks } from '~/lib/hacks-controller';

export default apiHandler({
  GET: async (req, res) => {
    const hacks = await getTopHacks();
    return res.status(200).json(hacks);
  },
});
