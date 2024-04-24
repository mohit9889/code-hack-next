import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();
  const footerData = {
    DISCOVER: [
      { link: "/", title: "Hot Tricks", query: { tab: "hot" } },
      { link: "/", title: "New Tricks", query: { tab: "new" } },
      { link: "/", title: "Top Tricks", query: { tab: "top" } },
    ],
    ENGAGE: [{ link: "/new", title: "Add Trick" }],
    MORE: [{ link: "/new", title: "Add Trick" }],
  };

  const handleNavigation = (_val) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    router.push(
      {
        pathname: _val.link,
        query: _val.query,
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className="flex flex-col pt-8 pb-20">
      <div>
        <h2 className=" font-bold text-xl mb-4">What is JS Hacks?</h2>
        <p className="">
          50 Hacks is a crowdsourced list of the 50 best productivity hacks.
          Anyone can write tips that help them get things done—no account
          needed. The internet upvotes the best ones.
        </p>
        <p>You get a curated list of the top productivity tips!</p>
      </div>
      <hr className="mt-20 mb-10 opacity-50 border-b-2" />
      <div className="flex justify-between">
        {Object.entries(footerData).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <h4 className="font-bold opacity-75 mb-4">{key}</h4>
            {value.map((_val, index) =>
              _val.query ? (
                <span
                  key={index}
                  onClick={() => handleNavigation(_val)}
                  className="mb-2 text-sm hover:underline cursor-pointer"
                >
                  {_val.title}
                </span>
              ) : (
                <Link key={index} as={_val.link} href={_val.link}>
                  <span className="mb-2 text-sm hover:underline cursor-pointer">
                    {_val.title}
                  </span>
                </Link>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
