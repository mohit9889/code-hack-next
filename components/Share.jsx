import { useEffect } from "react";

const BASE_URL = process.env.BASE_URL;

const ShareButton = ({ url, customClass }) => {
  const shareUrl = `${BASE_URL}/${url}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: shareUrl || window.location.href,
        })
        .then(() => {
          console.log("URL shared successfully.");
        })
        .catch((error) => {
          console.error("Error sharing URL:", error);
        });
    } else {
      // Copy URL to clipboard
      navigator.clipboard
        .writeText(shareUrl || window.location.href)
        .then(() => {
          console.log("URL copied to clipboard.");
        })
        .catch((error) => {
          console.error("Error copying URL to clipboard:", error);
        });
    }
  };

  useEffect(() => {
    // Check if navigator is available (in a browser environment)
    if (typeof navigator !== "undefined") {
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      if (isMobile && !url) {
        console.warn(
          "URL must be provided for mobile devices to trigger share menu."
        );
      } else {
        // Perform share action on mount
        handleShare();
      }
    }
  }, []);

  return (
    <button className={customClass} onClick={handleShare}>
      Share
    </button>
  );
};

export default ShareButton;
