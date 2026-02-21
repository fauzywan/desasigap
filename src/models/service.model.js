import mongoose from 'mongoose';

const serviceReportSchema = new mongoose.Schema(
  {
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    serviceType: {
      type: String,
      enum: ['appointments', 'transportations', 'reports'],
      required: true,
    },

    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    photo: {
      type: String,
      default: null,
    },

    notes: {
      type: String,
      required: true,
      trim: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const ServiceReport = mongoose.model('ServiceReport', serviceReportSchema);

export default ServiceReport;
