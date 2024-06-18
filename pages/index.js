/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  getAllHotTricksData,
  getAllNewTricksData,
  getAllTopTricksData,
} from "~/api";
import { tabs } from "~/utils/utilities";
import SEO from "~/components/SEO";
import { homeSeo } from "~/utils/seo";
import AddSvg from "~/public/icons/add.svg";

const Heading = dynamic(
  () =>
    import(
      /* webpackChunkName: "Heading" */
      "~/components/Heading"
    ),
);
const Tabs = dynamic(
  () =>
    import(
      /* webpackChunkName: "Tabs" */
      "~/components/Tabs"
    ),
);
const TrickCard = dynamic(
  () =>
    import(
      /* webpackChunkName: "TrickCard" */
      "~/components/TrickCard"
    ),
);

const SHOW_ADD_TRICK_BUTTON_ON_INDEX = [4, 11];

export default function Home({ tricksData }) {
  const { query } = useRouter();
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [currentTabData, setCurrentTabData] = useState([]);

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  useEffect(() => {
    const currentTab = tabs.filter((tab) => tab.link === query.tab);
    const currentTabData = currentTab.length
      ? tricksData[currentTab[0].link]
      : tricksData[tabs[0].link];

    setCurrentTab(currentTab.length ? currentTab[0] : tabs[0]);
    setCurrentTabData(currentTabData);
  }, [query]);

  const addTrickButton = (index) => {
    return (
      SHOW_ADD_TRICK_BUTTON_ON_INDEX.includes(index) && (
        <Link
          href="/new"
          as="/new"
          className="add-trick flex items-center bg-orange hover:bg-[#c2410c] rounded-lg p-3 text-white text-base font-medium shadow-lg"
        >
          <span className="icon icon-white mr-2">
            <AddSvg />
          </span>
          <span className="flex flex-col text-sm">
            <span>Got a trick? Share it now!</span>
            <span>No sign-up, just show-up and enjoy!</span>
          </span>
        </Link>
      )
    );
  };

  return (
    <>
      <SEO {...{ ...homeSeo }} />
      <div className="home my-5">
        {/* Heading */}
        <Heading
          heading="Get Ready to LOL with JavaScript Hacks!"
          customClasses="my-16"
        />
        {/* Tabs */}
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          handleTabChange={handleTabChange}
        />
        {/* Tricks */}
        <div className="flex flex-col gap-y-[20px] mt-[10px]">
          {currentTabData.map((trick, index) => (
            <React.Fragment key={trick._id}>
              <TrickCard key={trick._id} index={index + 1} trick={trick} />
              {addTrickButton(index + 1)}
            </React.Fragment>
          ))}
        </div>

        <div
          className={`flex flex-col ${
            currentTabData.length > 0 ? "" : "min-h-[500px]"
          }`}
        >
          <p className="mt-4 font-medium text-center">
            {currentTabData.length > 0
              ? `The end is near... of this list! But fear not, there's always more!`
              : "Welcome to the blank canvas! Your hack is the first stroke in our masterpiece of information."}
          </p>
          <div className="flex mt-4 items-center justify-center">
            <Link
              href="/new"
              as="/new"
              className="add-trick flex items-center bg-orange hover:bg-[#c2410c] rounded-lg p-3 text-white text-base font-semibold"
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

export async function getServerSideProps() {
  const [allTricksData, allNewTricksData, allTopTricksData] = await Promise.all(
    [getAllHotTricksData(), getAllNewTricksData(), getAllTopTricksData()],
  );
  const response = {
    hot: allTricksData,
    new: allNewTricksData.reverse(),
    top: allTopTricksData,
  };
  return { props: { tricksData: response } };
}
