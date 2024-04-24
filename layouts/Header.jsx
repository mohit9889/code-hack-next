import React from "react";
import Link from "next/link";
import AddSvg from "~/public/icons/add.svg";
import JSSvg from "~/public/icons/language/javascript.svg";

const Header = () => {
  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-lg">
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
      <span className="font-bold text-lg flex items-center">
        <span className="icon-20 mr-1">
          <JSSvg />
        </span>
        JS Tricks
      </span>
      <span className="font-bold text-lg"></span>
    </div>
  );
};

export default Header;
