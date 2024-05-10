import Head from "next/head";
import { useRouter } from "next/router";

const SEO = ({ title, description, ogImage }) => {
  const router = useRouter();
  const ogUrl = process.env.NEXT_PUBLIC_BASE_URL + router.asPath;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />
    </Head>
  );
};

export default SEO;
