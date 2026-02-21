import mongoose from 'mongoose';

const rewriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    idService: {
      type: String,
    },
    serviceType: {
      type: String,
    },

    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('rewrite', rewriteSchema);
