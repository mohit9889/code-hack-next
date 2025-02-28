import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import BreakSvg from '~/public/icons/break.svg';

/**
 * Footer Component
 *
 * Displays a footer with navigation links and a playful JavaScript Hacks introduction.
 *
 * @component
 * @returns {JSX.Element} The rendered Footer component
 */
const Footer = () => {
  const router = useRouter();
  const [isBreakSvgClicked, setIsBreakSvgClicked] = useState(false);

  /**
   * Footer navigation links categorized into sections.
   */
  const footerData = {
    DISCOVER: [
      { link: '/', title: 'Hot Tricks', query: { tab: 'hot' } },
      { link: '/', title: 'New Tricks', query: { tab: 'new' } },
      { link: '/', title: 'Top Tricks', query: { tab: 'top' } },
    ],
    ENGAGE: [{ link: '/new', title: 'Add Trick' }],
    MORE: [{ link: '/about-me', title: 'About Me' }],
  };

  /**
   * Handles navigation to different pages using Next.js router.
   * Scrolls to the top smoothly before navigating.
   *
   * @param {Object} navItem - Navigation item object containing `link` and optional `query`.
   */
  const handleNavigation = (navItem) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    router.push(
      {
        pathname: navItem.link,
        query: navItem.query,
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <footer className="flex flex-col pb-20 pt-8">
      {/* Introduction Section */}
      <section>
        <h2 className="mb-4 text-xl font-bold">What is JavaScript Hacks? 🚀</h2>
        <p className="font-medium">
          Hey there, fellow code adventurer! Ever wished JavaScript could be
          more than just lines of serious code? Well, welcome to JS Hacks –
          where JavaScript gets a playful makeover! 🎉
        </p>
        <p className="mt-2 font-medium">
          So, whether you're a coding newbie or a seasoned pro, join us on this
          epic quest to discover the quirkiest, coolest, and downright silliest
          JavaScript hacks out there. Trust us, your code will thank you (and
          maybe even crack a smile). 😄
        </p>
        <p className="mt-2 font-medium">
          Ready to hack, slash, and LOL your way through JavaScript? Let's dive
          in and unleash the fun-tastic power of JS Hacks together! 💻✨
        </p>
      </section>

      <hr className="mb-10 mt-20 border-b-2 opacity-50" />

      {/* Navigation Links */}
      <section className="flex justify-between">
        {Object.entries(footerData).map(([category, links]) => (
          <div key={category} className="flex flex-col">
            <h3 className="mb-4 font-bold opacity-75">{category}</h3>
            {links.map((navItem, index) =>
              navItem.query ? (
                <button
                  key={index}
                  onClick={() => handleNavigation(navItem)}
                  className="text-blue-600 mb-2 text-left text-sm hover:underline focus:outline-none"
                >
                  {navItem.title}
                </button>
              ) : (
                <Link
                  key={index}
                  href={navItem.link}
                  className="text-blue-600 mb-2 text-sm hover:underline"
                >
                  {navItem.title}
                </Link>
              )
            )}
          </div>
        ))}
      </section>

      {/* Fun Easter Egg Button */}
      <section className="mt-6 flex justify-end">
        <button
          onClick={() => setIsBreakSvgClicked(!isBreakSvgClicked)}
          aria-label="Trigger Easter Egg"
          className="icon-20 animate-blinkingBg cursor-pointer"
        >
          <BreakSvg />
        </button>
      </section>

      {/* Easter Egg Message */}
      {isBreakSvgClicked && (
        <p className="text-red-500 mt-2 text-center">
          Danger ahead! 🚨 Think twice before poking the coding bear! 🐻
        </p>
      )}
    </footer>
  );
};

export default Footer;
