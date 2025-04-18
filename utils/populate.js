export const populateComments = () => ({
  path: 'comments', // Populate the comments field
  populate: {
    path: 'replies', // Populate the replies field within each comment
    model: 'Comment',
  },
});
