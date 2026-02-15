import toast from 'react-hot-toast';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

/**
 * ShareButton Component
 *
 * Allows users to share a URL via the native share API or clipboard.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.url - The relative URL to be shared
 * @param {string} props.customClass - Additional CSS classes for styling
 * @returns {JSX.Element} A button that allows sharing the given URL.
 */
const ShareButton = ({ url, customClass }) => {
  const shareUrl = `${BASE_URL}/${url}`.replace(/([^:]\/)\/+/g, '$1'); // Prevent double slashes

  /**
   * Handles sharing via the Web Share API or clipboard fallback.
   */
  const handleShare = async () => {
    const finalUrl = shareUrl || window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check this out!',
          url: finalUrl,
        });
      } catch (err) {
        console.error('Sharing failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(finalUrl);
        toast('URL copied to clipboard! 🚀 Share the JavaScript magic!', {
          style: {
            borderRadius: '10px',
            background: '#323643',
            color: '#fff',
          },
        });
      } catch (err) {
        console.error('Clipboard copy failed:', err);
      }
    }
  };

  return (
    <button className={customClass} onClick={handleShare}>
      Share
    </button>
  );
};

export default ShareButton;
