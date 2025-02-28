import React from 'react';
import { useRouter } from 'next/router';
import TopTrickSvg from '~/public/icons/tabs/top-trick.svg';
import HotTrickSvg from '~/public/icons/tabs/hot-trick.svg';
import NewTrickSvg from '~/public/icons/tabs/new-trick.svg';

/**
 * Tabs Component
 *
 * Renders a tab navigation bar allowing users to switch between different categories.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {Array} props.tabs - Array of tab objects containing `title` and `link`
 * @param {Object} props.currentTab - The currently active tab object
 * @param {Function} props.handleTabChange - Callback function to handle tab state changes
 * @returns {JSX.Element} The tab navigation UI
 */
const Tabs = ({ tabs = [], currentTab = {}, handleTabChange = () => {} }) => {
  const router = useRouter();

  /**
   * Returns the corresponding icon component based on the tab name.
   * @param {string} name - The tab name ('hot', 'new', 'top')
   * @returns {JSX.Element|null} - The icon component or null
   */
  const getTabIcon = (name) => {
    const icons = {
      hot: <HotTrickSvg />,
      new: <NewTrickSvg />,
      top: <TopTrickSvg />,
    };
    return icons[name] || null;
  };

  /**
   * Handles tab switching by updating the URL query and scrolling to the top.
   * @param {Object} tab - The selected tab object
   */
  const handleTabSelection = (tab) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, tab: tab.link },
      },
      undefined,
      { shallow: true }
    );

    handleTabChange(tab);
  };

  return (
    <ul className="sticky top-0 z-10 -mx-2 flex items-center bg-primary-gray pt-5 sm:px-2">
      {tabs.map((tab) => (
        <li
          key={tab.title}
          className={`flex flex-1 cursor-pointer items-center justify-center border-b-2 border-solid border-black-primary pb-3 text-base font-bold ${
            currentTab.link === tab.link
              ? ''
              : 'border-black-primary/30 opacity-30 hover:border-black-primary/30 hover:opacity-100'
          }`}
          onClick={() => handleTabSelection(tab)}
        >
          <span className="icon-20 mr-1">{getTabIcon(tab.link)}</span>
          {tab.title}
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
