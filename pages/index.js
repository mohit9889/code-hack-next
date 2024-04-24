import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Heading from "~/components/Heading";
import Tabs from "~/components/Tabs";
import TrickCard from "~/components/TrickCard";
import {
  getAllTricksData,
  getAllNewTricksData,
  getAllTopTricksData,
} from "~/api";
import { tabs } from "~/utils/utilities";

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

  return (
    <div className="home my-5">
      {/* Heading */}
      <Heading
        heading="Top  JavaScript hacks chosen by internet and you"
        customClasses="my-16"
      />
      {/* Tabs */}
      <Tabs
        tabs={tabs}
        currentTab={currentTab}
        handleTabChange={handleTabChange}
      />
      {/* Tricks */}
      <div className="flex flex-col gap-y-[10px] mt-[10px]">
        {currentTabData.map((trick, index) => (
          <TrickCard key={index} index={index + 1} trick={trick} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const [allTricksData, allNewTricksData, allTopTricksData] = await Promise.all(
    [getAllTricksData(), getAllNewTricksData(), getAllTopTricksData()]
  );
  const response = {
    hot: allTricksData,
    new: allNewTricksData.reverse(),
    top: allTopTricksData,
  };
  return { props: { tricksData: response } };
}
