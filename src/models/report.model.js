import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ReportCategory',
      default: null,
    },

    photos: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'resolved', 'rejected', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

const Report = mongoose.model('Report', reportSchema);
export default Report;
