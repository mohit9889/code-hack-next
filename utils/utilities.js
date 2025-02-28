/**
 * Available programming languages with their respective icons.
 * @type {Array<{name: string, icon: string}>}
 */
export const languages = [
  {
    name: 'JavaScript',
    icon: 'icons/language/javascript.svg',
  },
];

/**
 * Available themes for the code editor.
 * @type {string[]}
 */
export const themes = ['monokai'];

/**
 * Background options.
 * @type {string[]}
 */
export const backgrounds = ['linear-gradient(to right, #8360c3, #2ebf91)'];

/**
 * Default initial code.
 * @type {string}
 */
export const initialCode = ``;

/**
 * Navigation tabs for sorting tricks.
 * @type {Array<{link: string, title: string}>}
 */
export const tabs = [
  { link: 'hot', title: 'Hot' },
  { link: 'new', title: 'New' },
  { link: 'top', title: 'Top' },
];

/**
 * Generates a URL-friendly trick identifier.
 *
 * @param {string} title - The title of the trick.
 * @param {string} id - The unique ID of the trick.
 * @returns {string} - The processed URL-friendly string.
 */
export const getTrickURL = (title, id) => {
  return `${title.replace(/\s+/g, '-').replace(/[^\w-]/g, '')}-${id}`;
};

/**
 * Formats a timestamp into a human-readable time difference or date.
 *
 * @param {string | number | Date} timestamp - The timestamp to format.
 * @returns {string} - A relative time description (e.g., "2 days ago") or a formatted date.
 */
export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / (60 * 1000));
  const hours = Math.floor(diff / (60 * 60 * 1000));
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  if (days < 14) return '1 week ago';
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;

  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
