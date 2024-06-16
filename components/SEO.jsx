import Head from "next/head";
import { useRouter } from "next/router";

const DEFAULT_CANONICAL_URL = "https://jshack.fun";

const SEO = ({ title, description, ogImage, keywords, canonical = "" }) => {
  const router = useRouter();
  const ogUrl = process.env.BASE_URL + router.asPath;
  const canonicalUrl = canonical
    ? canonical
    : `${DEFAULT_CANONICAL_URL}${router.asPath}`;

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

      {/* canonical */}
      <link rel="canonical" href={canonicalUrl} />
      {/* other meta tags */}
      <meta name="theme-color" content="#E3E3E3"></meta>
      <link rel="apple-touch-icon" sizes="180x180" href="/img/js-logo.png" />
    </Head>
  );
};

export default SEO;
