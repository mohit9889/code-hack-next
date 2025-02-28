import { sitemapURLs } from '~/api';

export default async function handler(req, res) {
  const BASE_URL = process.env.BASE_URL;

  try {
    // Fetch movie genres and generate slugs
    const resData = await sitemapURLs();
    const movies =
      resData.map((url) => {
        return `/trick/${url.url}`;
      }) || [];

    // Define static pages
    const staticPages = ['/', '/404', '/about-me', '/new'];

    // Combine static pages and dynamic movie slugs
    const pages = [...staticPages, ...movies];

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map(
            (url) => `
          <url>
            <loc>${BASE_URL}${url}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
          </url>
        `
          )
          .join('')}
      </urlset>
    `;

    // Set response headers
    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
}
