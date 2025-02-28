import React from 'react';
import dynamic from 'next/dynamic';
import SEO from '~/components/SEO';
import { aboutMeSeo } from '~/utils/seo';

// Dynamically import components to optimize performance
const Heading = dynamic(() => import('~/components/Heading'));
const BackButton = dynamic(() => import('~/components/BackButton'));

/**
 * AboutMe Page Component
 * Displays an "Under Construction" message with a heading and back button.
 */
const AboutMe = () => {
  return (
    <>
      {/* Set up SEO metadata for the page */}
      <SEO {...aboutMeSeo} />

      <div className="mt-5">
        {/* Button to navigate back */}
        <BackButton />

        {/* Placeholder content for "About Me" page */}
        <div className="flex h-[400px] items-center">
          <Heading heading="Coming soon: Because good things come to those who wait... and refresh the page." />
        </div>
      </div>
    </>
  );
};

export default AboutMe;
