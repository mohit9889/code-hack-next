const BASE_URL = process.env.BASE_URL;

const ShareButton = ({ url, customClass }) => {
  const shareUrl = `${BASE_URL}/${url}`;

  const handleShare = async () => {
    const url = shareUrl || window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          url: url,
        });
      } catch (err) {
        console.log("Failed to Share", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
      } catch (err) {
        console.log("Failed to Copy", err);
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
