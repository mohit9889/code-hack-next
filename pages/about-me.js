import React from "react";
import dynamic from "next/dynamic";
import SEO from "~/components/SEO";
import { aboutMeSeo } from "~/utils/seo";

const Heading = dynamic(
  () =>
    import(
      /* webpackChunkName: "Heading" */
      "~/components/Heading"
    ),
);
const BackButton = dynamic(
  () =>
    import(
      /* webpackChunkName: "BackButton" */
      "~/components/BackButton"
    ),
);

const AboutMe = () => {
  return (
    <>
      <SEO {...{ ...aboutMeSeo }} />
      <div className="mt-5">
        <BackButton />
        <div className=" h-[400px] flex items-center">
          <Heading
            heading="Coming soon: Because good things come to those who wait... and refresh
        the page."
          />
        </div>
      </div>
    </>
  );
};

export default AboutMe;
