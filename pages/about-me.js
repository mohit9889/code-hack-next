import React from "react";
import BackButton from "~/components/BackButton";
import Heading from "~/components/Heading";
import SEO from "~/components/SEO";
import { aboutMeSeo } from "~/utils/seo";

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
