import React from 'react';
import Link from 'next/link';
import AddSvg from '~/public/icons/add.svg';
import JSSvg from '~/public/icons/language/javascript.svg';

/**
 * Header Component
 *
 * Displays the site header with a logo and a "New Trick" button.
 *
 * @component
 * @returns {JSX.Element} The rendered Header component.
 */
const Header = () => {
  return (
    <header className="flex items-center justify-between rounded-lg bg-white p-3 md:justify-normal">
      {/* New Trick Button */}
      <div className="md:w-[calc(50%-55px)]">
        <Link
          href="/new"
          className="add-trick flex w-max items-center rounded-lg bg-orange p-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#c2410c]"
        >
          <AddSvg className="mr-1 size-5" aria-hidden="true" />
          <span>New Trick</span>
        </Link>
      </div>

      {/* Site Logo & Title */}
      <Link href="/" className="flex items-center text-lg font-bold">
        <JSSvg className="mr-1 size-6" aria-hidden="true" />
        <span>JS Tricks</span>
      </Link>
    </header>
  );
};

export default Header;
