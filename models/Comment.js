import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    user_name: { type: String, required: true },
    twitter_id: { type: String },
    like_count: { type: Number, default: 0 },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    hackId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hack',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Comment ||
  mongoose.model('Comment', CommentSchema);
