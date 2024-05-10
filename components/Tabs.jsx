import React from "react";
import { useRouter } from "next/router";
import TopTrickSvg from "~/public/icons/tabs/top-trick.svg";
import HotTrickSvg from "~/public/icons/tabs/hot-trick.svg";
import NewTrickSvg from "~/public/icons/tabs/new-trick.svg";

const Tabs = ({
  tabs = [],
  currentTab = {},
  handleTabChange: handleTabStateChange = () => {},
}) => {
  const router = useRouter();

  const getTabIcon = (name) => {
    switch (name) {
      case "hot":
        return <HotTrickSvg />;
      case "new":
        return <NewTrickSvg />;
      case "top":
        return <TopTrickSvg />;
      default:
        return null;
    }
  };

  const handleTabChange = (tab) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, tab: tab.link },
      },
      undefined,
      { shallow: true }
    );
    handleTabStateChange(tab);
  };

  return (
    <ul className="flex items-center pt-5 sticky top-0 bg-primary-gray z-10 -mx-2 sm:px-2">
      {tabs.map((tab) => (
        <li
          className={`flex-1 flex justify-center items-center cursor-pointer border-black-primary border-solid border-b-2 pb-3 font-bold text-base ${
            currentTab.link === tab.link
              ? ""
              : "border-black-primary border-opacity-30 opacity-30 hover:opacity-100 hover:border-opacity-30"
          }`}
          key={tab.title}
          onClick={() => handleTabChange(tab)}
        >
          <span
            className={`${tab.link !== "top" ? "icon-20" : "icon-20"} mr-1`}
          >
            {getTabIcon(tab.link)}
          </span>
          {tab.title}
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
