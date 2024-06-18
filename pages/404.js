import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import SEO from "~/components/SEO";
import { pageNotFoundSeo } from "~/utils/seo";

const Heading = dynamic(
  () =>
    import(
      /* webpackChunkName: "Heading" */
      "~/components/Heading"
    ),
);

const ErrorPage = () => {
  return (
    <>
      <SEO {...{ ...pageNotFoundSeo }} />
      <div className="mt-5 h-[400px] flex flex-col items-center justify-center">
        <Heading heading="Oops! Looks like you've taken a wrong turn. Don't worry, even GPS gets confused sometimes!" />
        <Link
          href="/"
          as="/"
          className=" mt-4 w-max flex items-center bg-orange hover:bg-[#c2410c] rounded-lg p-3 text-white text-base font-semibold "
        >
          Go Back
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
