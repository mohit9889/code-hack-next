import { useRouter } from 'next/router';
import BackSvg from '~/public/icons/left-arrow.svg';

/**
 * BackButton Component
 *
 * A simple button that navigates the user back to the previous page.
 * Uses Next.js router for client-side navigation.
 *
 * @component
 * @returns {JSX.Element} A button with an icon that navigates back.
 */
const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()} // Navigate back to the previous page
      className="flex items-center rounded-lg px-3 py-2 text-sm hover:bg-[#94a3b8]/25"
    >
      {/* Icon for back navigation */}
      <span className="icon-12">
        <BackSvg />
      </span>
      Back
    </button>
  );
};

export default BackButton;
