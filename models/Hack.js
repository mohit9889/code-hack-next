import mongoose from 'mongoose';
import Comment from './Comment';

const HackSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    code_lang: { type: String, required: true },
    user_name: { type: String, required: true },
    twitter_id: { type: String },
    like_count: { type: Number, default: 0 },
    comment_count: { type: Number, default: 0 },
    is_reported: { type: Number, default: 0 },
    offensive_score: { type: Number, default: 0 },
    most_visited: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

export default mongoose.models.Hack || mongoose.model('Hack', HackSchema);
