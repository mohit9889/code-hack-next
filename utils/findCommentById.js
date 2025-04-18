const findCommentById = async (comments, commentId) => {
  for (const comment of comments) {
    if (comment._id.toString() === commentId) return comment;

    if (comment.replies && comment.replies.length > 0) {
      const found = await findCommentById(comment.replies, commentId);
      if (found) return found;
    }
  }
  return null;
};

export default findCommentById;
