/**
 * API service for handling hack-related operations.
 */
const API_BASE_PATH = process.env.API_BASE_URL;

/**
 * Generic function to make API requests.
 * @param {string} endpoint - The API endpoint.
 * @param {string} [method='GET'] - HTTP method.
 * @param {Object} [body=null] - Request body (for POST, PUT, DELETE).
 * @returns {Promise<any>} - Response data.
 */
const fetchAPI = async (endpoint, method = 'GET', body = null) => {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
      ...(body && { body: JSON.stringify(body) }),
    };

    const response = await fetch(`${API_BASE_PATH}${endpoint}`, options);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(`Error in fetchAPI (${method} ${endpoint}):`, error);
    throw error;
  }
};

/** Fetch all hacks */
export const getAllTricksData = () => fetchAPI('/hacks');

/** Fetch a single hack by ID */
export const getSingleTrickData = (id) => fetchAPI(`/hacks/${id}`);

/** Fetch new hacks */
export const getAllNewTricksData = () => fetchAPI('/hacks/new');

/** Fetch top-rated hacks */
export const getAllTopTricksData = () => fetchAPI('/hacks/top');

/** Fetch trending hacks */
export const getAllHotTricksData = () => fetchAPI('/hacks/hot');

/** Like a hack */
export const likeHack = (id) => fetchAPI(`/hacks/${id}/like`, 'POST');

/** Dislike a hack */
export const dislikeHack = (id) => fetchAPI(`/hacks/${id}/dislike`, 'POST');

/** Submit a new hack */
export const submitHack = (data) => fetchAPI('/hacks', 'POST', data);

/** Add a comment to a hack */
export const addCommentToHack = (hackId, commentData) =>
  fetchAPI(`/hacks/${hackId}/comments`, 'POST', commentData);

/** Add a reply to a comment */
export const addReplyToComment = (hackId, commentId, replyData) =>
  fetchAPI(`/hacks/${hackId}/comments`, 'POST', {
    ...replyData,
    replyTo: commentId,
  });

/** Like a comment */
export const likeComment = (hackId, commentId) =>
  fetchAPI(`/hacks/${hackId}/comments/${commentId}/like`, 'POST');

/** Dislike a comment */
export const dislikeComment = (hackId, commentId) =>
  fetchAPI(`/hacks/${hackId}/comments/${commentId}/dislike`, 'POST');

/** Report a hack */
export const reportHack = (hackId) =>
  fetchAPI(`/hacks/${hackId}/report`, 'POST');

/** Mark a hack as visited */
export const visitedHack = (id) => fetchAPI(`/hacks/${id}/visited`, 'POST');
