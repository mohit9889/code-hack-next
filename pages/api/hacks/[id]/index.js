import { apiHandler } from '~/lib/api-handler';
import { hackIdSchema } from '~/lib/validations';
import Hack from '~/models/Hack';
import { populateComments } from '~/utils/populate';

export default apiHandler({
  GET: async (req, res) => {
    const { id } = req.query;
    hackIdSchema.parse(id);

    const hack = await Hack.findById(id).populate(populateComments());
    if (!hack) {
      const error = new Error('Hack not found');
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json(hack);
  },
});
