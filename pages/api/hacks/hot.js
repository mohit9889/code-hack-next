import { apiHandler } from '~/lib/api-handler';
import { getHotHacks } from '~/lib/hacks-controller';

export default apiHandler({
  GET: async (req, res) => {
    const hacks = await getHotHacks();
    return res.status(200).json(hacks);
  },
});
