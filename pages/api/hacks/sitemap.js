import dbConnect from '~/lib/mongodb';
import Hack from '~/models/Hack';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await dbConnect();

    const hacks = await Hack.find({}, 'title _id');

    const sitemapUrls = hacks.map(({ title, _id }) => ({
      url: `${title
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^\w-]/g, '') // Remove non-alphanumeric chars
        .toLowerCase()}-${_id}`, // Append ID
    }));

    return res.status(200).json(sitemapUrls);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
}
