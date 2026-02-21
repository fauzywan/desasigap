import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { boolean } from 'joi';

const suggestionLikeSchema = new mongoose.Schema(
  {
    suggestion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'suggestion',
      required: true,
      index: true,
    },
    user: {
      type: moggose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    clientId: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);
suggestionLikeSchema.index({ suggestion: 1, clientId: 1 }, { unique: true });
const suggestionLike = mongoose.model('suggestionLike', suggestionLikeSchema);

export default suggestionLike;
