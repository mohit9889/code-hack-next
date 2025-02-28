/**
 * Save data to session storage.
 *
 * @param {string} key - The key under which the data will be stored.
 * @param {any} data - The data to be saved (automatically stringified).
 */
export const saveToSessionStorage = (key, data) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data to session storage (key: ${key}):`, error);
  }
};

/**
 * Retrieve data from session storage.
 *
 * @param {string} key - The key of the stored data.
 * @returns {any | null} - The parsed data from session storage, or null if not found or error occurs.
 */
export const getFromSessionStorage = (key) => {
  try {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(
      `Error getting data from session storage (key: ${key}):`,
      error
    );
    return null;
  }
};
