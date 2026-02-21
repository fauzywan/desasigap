import mongoose from 'mongoose';

const suggestionSchema = new mongoose.Schema(
  {
    isAnonymous: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: null,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
    },
  },
  {
    timestamps: true,
  },
);

const suggestion = mongoose.model('suggestion', suggestionSchema);

export default suggestion;
