import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import BreakSvg from "~/public/icons/break.svg";

const Footer = () => {
  const router = useRouter();
  const [isBreakSvgClick, setIsBreakSvgClick] = useState(false);

  const footerData = {
    DISCOVER: [
      { link: "/", title: "Hot Tricks", query: { tab: "hot" } },
      { link: "/", title: "New Tricks", query: { tab: "new" } },
      { link: "/", title: "Top Tricks", query: { tab: "top" } },
    ],
    ENGAGE: [{ link: "/new", title: "Add Trick" }],
    MORE: [{ link: "/about-me", title: "About Me" }],
  };

  const handleNavigation = (_val) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    router.push(
      {
        pathname: _val.link,
        query: _val.query,
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <div className="flex flex-col pt-8 pb-20">
      <div>
        <h2 className=" font-bold text-xl mb-4">
          What is JavaScript Hacks? 🚀
        </h2>
        <p className=" font-medium">
          Hey there, fellow code adventurer! Ever wished JavaScript could be
          more than just lines of serious code? Well, welcome to JS Hacks –
          where JavaScript gets a playful makeover!🎉
        </p>
        <p className=" font-medium mt-2">
          So, whether you're a coding newbie or a seasoned pro, join us on this
          epic quest to discover the quirkiest, coolest, and downright silliest
          JavaScript hacks out there. Trust us, your code will thank you (and
          maybe even crack a smile).😄
        </p>
        <p className=" font-medium mt-2">
          Ready to hack, slash, and LOL your way through JavaScript? Let's dive
          in and unleash the fun-tastic power of JS Hacks together! 💻✨
        </p>
      </div>
      <hr className="mt-20 mb-10 opacity-50 border-b-2" />
      <div className="flex justify-between">
        {Object.entries(footerData).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <h3 className="font-bold opacity-75 mb-4">{key}</h3>
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
              ),
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <span
          onClick={() => setIsBreakSvgClick(!isBreakSvgClick)}
          className="icon-20 cursor-pointer animate-blinkingBg"
        >
          <BreakSvg />
        </span>
      </div>
      {isBreakSvgClick && (
        <p>Danger ahead! 🚨 Think twice before poking the coding bear! 🐻</p>
      )}
    </div>
  );
};

export default Footer;
