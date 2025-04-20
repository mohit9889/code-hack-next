/**
 * Navigation tabs for sorting tricks.
 * @type {Array<{link: string, title: string}>}
 */
export const tabs = [
  { link: 'new', title: 'New' },
  { link: 'hot', title: 'Hot' },
  { link: 'top', title: 'Top' },
];

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
export const themes = ['vscode_dark'];

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

// Set of indexes where the "Add Trick" button should be shown
export const SHOW_ADD_TRICK_BUTTON_ON_INDEX = new Set([4, 11, 18, 25, 32]);
