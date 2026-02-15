import { apiHandler } from '~/lib/api-handler';
import { getHackById } from '~/lib/hacks-controller';
import { hackIdSchema } from '~/lib/validations';

export default apiHandler({
  GET: async (req, res) => {
    const { id } = req.query;
    hackIdSchema.parse(id);

    const hack = await getHackById(id);
    if (!hack) {
      const error = new Error('Hack not found');
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json(hack);
  },
});
