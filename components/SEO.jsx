import Head from 'next/head';
import { useRouter } from 'next/router';

/**
 * SEO Component
 *
 * Dynamically sets metadata and Open Graph tags for improved SEO.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description for SEO
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.keywords - SEO keywords (comma-separated)
 * @returns {JSX.Element} The SEO component with meta tags.
 */
const SEO = ({ title, description, ogImage, keywords }) => {
  const router = useRouter();
  const ogUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#E3E3E3" />
      <link rel="apple-touch-icon" sizes="180x180" href="/img/js-logo.png" />
    </Head>
  );
};

export default SEO;
