import React from "react";
import Link from "next/link";
import BackSvg from "~/public/icons/left-arrow.svg";
import Heading from "~/components/Heading";

const ErrorPage = () => {
  return (
    <div className="mt-5 h-[400px] flex flex-col items-center justify-center">
      <Heading heading="Oops! Looks like you've taken a wrong turn. Don't worry, even GPS gets confused sometimes!" />
      <Link
        href="/"
        as="/"
        className=" mt-4 w-max flex items-center bg-orange hover:bg-[#c2410c] rounded-lg p-3 text-white text-base font-semibold "
      >
        {/* <span className="icon icon-white mr-1">
          <BackSvg />
        </span> */}
        Go Back
      </Link>
    </div>
  );
};

export default ErrorPage;
