import mongoose from 'mongoose';

const transportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    deviceId: {
      type: String,
      required: null,
    },
    peopleTotal: {
      type: Number,
      required: true,
    },
    transportType: {
      type: String,
      enum: ['ambulance', 'antar_jemput', 'operasional'],
      required: true,
    },
    pickupLocation: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    pickupTime: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
      trim: true,
      default: null,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'on_trip', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

export default mongoose.model('transport', transportSchema);
