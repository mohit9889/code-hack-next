/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  getAllHotTricksData,
  getAllNewTricksData,
  getAllTopTricksData,
} from '~/services';
import { tabs, SHOW_ADD_TRICK_BUTTON_ON_INDEX } from '~/constants';
import SEO from '~/components/SEO';
import { homeSeo } from '~/utils/seo';
import AddSvg from '~/public/icons/add.svg';

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

  /**
   * Renders an "Add Trick" button at specific indexes.
   * @param {number} index - The index position in the list.
   * @returns {JSX.Element|null} The button if the index matches, otherwise null.
   */
  const addTrickButton = (index) =>
    SHOW_ADD_TRICK_BUTTON_ON_INDEX.has(index) ? (
      <Link
        href="/new"
        className="add-trick flex items-center rounded-lg bg-orange p-3 text-base font-medium text-white shadow-lg hover:bg-[#c2410c]"
      >
        <span className="icon icon-white mr-2">
          <AddSvg />
        </span>
        <span className="flex flex-col text-sm">
          <span>Got a trick? Share it now!</span>
          <span>No sign-up, just show-up and enjoy!</span>
        </span>
      </Link>
    ) : null;

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
              {addTrickButton(index + 1)}
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
            <Link
              href="/new"
              className="add-trick flex items-center rounded-lg bg-orange p-3 text-base font-semibold text-white hover:bg-[#c2410c]"
            >
              <span className="icon icon-white mr-1">
                <AddSvg />
              </span>
              New Trick
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Fetches tricks data from the server and passes it as props to the page.
 * Runs on each request (Server-Side Rendering).
 */
export async function getServerSideProps() {
  // Fetch all categories of tricks concurrently for better performance
  const [hot, newTricks, top] = await Promise.all([
    getAllHotTricksData(),
    getAllNewTricksData(),
    getAllTopTricksData(),
  ]);

  return {
    props: {
      tricksData: {
        hot,
        new: newTricks.reverse(), // Reverse new tricks list to show latest first
        top,
      },
    },
  };
}
