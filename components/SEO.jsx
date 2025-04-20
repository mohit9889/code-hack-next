import Head from 'next/head';
import { useRouter } from 'next/router';

/**
 * SEO Component
 *
 * A reusable component for setting up SEO-related metadata in the head of the document,
 * including Open Graph tags and optional JSON-LD structured data.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.title - The title of the page.
 * @param {string} props.description - The meta description for the page.
 * @param {string} props.ogImage - URL of the image used for Open Graph.
 * @param {string} props.keywords - Comma-separated list of SEO keywords.
 * @param {Object} [props.schemaData] - Optional JSON-LD structured data.
 * @returns {JSX.Element} A component that injects SEO meta tags into the page head.
 */
const SEO = ({ title, description, ogImage, keywords, schemaData }) => {
  const router = useRouter();
  const ogUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`;

  // Inject dynamic URL into schemaData
  const updatedSchema = schemaData
    ? {
        ...schemaData,
        url: ogUrl,
      }
    : null;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph Meta Tags for social sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />

      {/* Misc Meta Tags */}
      <meta name="theme-color" content="#E3E3E3" />
      <link rel="apple-touch-icon" sizes="180x180" href="/img/js-logo.png" />

      {/* JSON-LD Structured Data for rich results */}
      {updatedSchema && (
        <script type="application/ld+json">
          {JSON.stringify(updatedSchema)}
        </script>
      )}
    </Head>
  );
};

export default SEO;
