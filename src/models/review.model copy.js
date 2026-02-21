import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    // Pembuat (admin / user)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Jenis data
    type: {
      type: String,
      enum: ['report', 'review'],
      required: true,
    },

    // Jenis layanan
    serviceType: {
      type: String,
      enum: ['appointments', 'transportations', 'reports'],
      required: true,
    },

    // ID layanan
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    /* ========= KHUSUS REPORT ========= */

    photo: {
      type: String,
      default: null,
    },

    notes: {
      type: String,
      trim: true,
    },

    /* ========= KHUSUS REVIEW ========= */

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Review', reviewSchema);
