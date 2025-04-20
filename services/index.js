/**
 * Generic function to make API requests using Next.js API routes.
 * @param {string} endpoint - The local API endpoint (e.g., /api/hacks).
 * @param {string} [method='GET'] - HTTP method.
 * @param {Object} [body=null] - Request body (for POST, PUT, DELETE).
 * @returns {Promise<any>} - Response data.
 */
const fetchAPI = async (endpoint, method = 'GET', body = null) => {
  try {
    const isServer = typeof window === 'undefined';

    const baseUrl = isServer ? process.env.BASE_URL : '';

    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
      ...(body && { body: JSON.stringify(body) }),
    };

    const response = await fetch(`${baseUrl}/api${endpoint}`, options);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(`Error in fetchAPI (${method} ${endpoint}):`, error);
    throw error;
  }
};

//
// ─── HACKS ──────────────────────────────────────────────────────────────────────
//

/** Get all hacks */
export const getAllTricksData = () => fetchAPI('/hacks');

/** Get single hack by ID */
export const getSingleTrickData = (id) => fetchAPI(`/hacks/${id}`);

/** Get newest hacks */
export const getAllNewTricksData = () => fetchAPI('/hacks/new');

/** Get top-rated hacks */
export const getAllTopTricksData = () => fetchAPI('/hacks/top');

/** Get trending (hot) hacks */
export const getAllHotTricksData = () => fetchAPI('/hacks/hot');

/** Submit a new hack */
export const submitHack = (data) => fetchAPI('/hacks', 'POST', data);

/** Like a hack */
export const likeHack = (hackId) => fetchAPI(`/hacks/${hackId}/like`, 'POST');

/** Dislike a hack */
export const dislikeHack = (hackId) =>
  fetchAPI(`/hacks/${hackId}/dislike`, 'POST');

/** Report a hack */
export const reportHack = (hackId) =>
  fetchAPI(`/hacks/${hackId}/report`, 'POST');

/** Mark hack as visited */
export const visitedHack = (id) => fetchAPI(`/hacks/${id}/visited`, 'POST');

//
// ─── COMMENTS ───────────────────────────────────────────────────────────────────
//

/** Get all comments for a hack */
export const getHackComments = (hackId) =>
  fetchAPI(`/hacks/${hackId}/comments`);

/** Add a comment to a hack */
export const addCommentToHack = (hackId, commentData) =>
  fetchAPI(`/hacks/${hackId}/comments`, 'POST', commentData);

/** Add a reply to a specific comment */
export const addReplyToComment = (hackId, commentId, replyData) =>
  fetchAPI(`/hacks/${hackId}/comments`, 'POST', {
    ...replyData,
    replyTo: commentId,
  });

/** Like a comment or reply */
export const likeComment = (hackId, commentId) =>
  fetchAPI(`/hacks/${hackId}/comments/${commentId}/like`, 'POST');

/** Dislike a comment or reply */
export const dislikeComment = (hackId, commentId) =>
  fetchAPI(`/hacks/${hackId}/comments/${commentId}/dislike`, 'POST');

//
// ─── SITEMAP ─────────────────────────────────────────────────────────────────────
//

/** Get URLs for sitemap */
export const sitemapURLs = () => fetchAPI(`/hacks/sitemap`);
