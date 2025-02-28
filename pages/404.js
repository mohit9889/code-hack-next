import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import SEO from '~/components/SEO';
import { pageNotFoundSeo } from '~/utils/seo';

// Dynamically import the Heading component for better performance
const Heading = dynamic(() => import('~/components/Heading'));

/**
 * ErrorPage Component
 * Displays a 404 error message when a user navigates to a non-existent page.
 */
const ErrorPage = () => {
  return (
    <>
      {/* Set up SEO metadata for the 404 page */}
      <SEO {...pageNotFoundSeo} />

      <div className="mt-5 flex h-[400px] flex-col items-center justify-center">
        {/* Display error message */}
        <Heading heading="Oops! Looks like you've taken a wrong turn. Don't worry, even GPS gets confused sometimes!" />

        {/* Button to navigate back to the homepage */}
        <Link
          href="/"
          className="mt-4 flex w-max items-center rounded-lg bg-orange p-3 text-base font-semibold text-white hover:bg-[#c2410c]"
        >
          Go Back
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
