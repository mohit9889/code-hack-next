/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { getTopHacks, getNewHacks, getHotHacks } from '~/lib/hacks-controller';
import { tabs, SHOW_ADD_TRICK_BUTTON_ON_INDEX } from '~/constants';
import SEO from '~/components/SEO';
import { homeSeo } from '~/utils/seo';
import AddTrickButton from '~/components/AddTrickButton';

// Dynamically import components for better performance (Code Splitting)
const Heading = dynamic(() => import('~/components/Heading'));
const Tabs = dynamic(() => import('~/components/Tabs'));
const TrickCard = dynamic(() => import('~/components/TrickCard'));

export default function Home({ tricksData }) {
  const { query } = useRouter();

  // State to manage currently selected tab and its corresponding data
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [currentTabData, setCurrentTabData] = useState(
    tricksData[tabs[0].link]
  );

  /**
   * Updates the selected tab and its corresponding tricks data
   * whenever the URL query changes.
   */
  useEffect(() => {
    const selectedTab = tabs.find((tab) => tab.link === query.tab) || tabs[0];
    setCurrentTab(selectedTab);
    setCurrentTabData(tricksData[selectedTab.link] || []);
  }, [query.tab, tricksData]);

  return (
    <>
      {/* Set up SEO metadata for the page */}
      <SEO {...homeSeo} />

      <div className="home my-5">
        {/* Page Title */}
        <Heading
          heading="Get Ready to LOL with JavaScript Hacks!"
          customClasses="my-16"
        />

        {/* Tab Navigation for filtering tricks */}
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          handleTabChange={setCurrentTab}
        />

        {/* List of tricks */}
        <div className="mt-[10px] flex flex-col gap-y-[20px]">
          {currentTabData.map((trick, index) => (
            <React.Fragment key={trick._id}>
              <TrickCard index={index + 1} trick={trick} />
              {SHOW_ADD_TRICK_BUTTON_ON_INDEX.has(index + 1) && (
                <AddTrickButton />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Message at the bottom of the list */}
        <div
          className={`flex flex-col ${currentTabData.length > 0 ? '' : 'min-h-[500px]'}`}
        >
          <p className="mt-4 text-center font-medium">
            {currentTabData.length > 0
              ? "The end is near... of this list! But fear not, there's always more!"
              : 'Welcome to the blank canvas! Your hack is the first stroke in our masterpiece of information.'}
          </p>

          {/* Button to add a new trick */}
          <div className="mt-4 flex items-center justify-center">
            <AddTrickButton />
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Fetches tricks data directly from the DB at build time.
 * Revalidates every 60 seconds (ISR).
 */
export async function getStaticProps() {
  // Fetch all categories of tricks concurrently
  const [hot, newTricks, top] = await Promise.all([
    getHotHacks(),
    getNewHacks(),
    getTopHacks(),
  ]);

  return {
    props: {
      tricksData: {
        hot,
        new: newTricks, // Controller already sorts by newest
        top,
      },
    },
    revalidate: 60,
  };
}
