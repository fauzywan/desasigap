import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    clientId: {
      type: String,
      default: null,
    },

    meetingWith: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    purpose: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      default: 'Kantor Desa',
      trim: true,
    },

    status: {
      type: String,
      enum: [
        'pending',
        'approved',
        'rejected',
        'completed',
        'approved_with_reschedule',
        'cancelled',
      ],
      default: 'pending',
    },
    rejectionReason: {
      type: String,
      default: null,
    },

    cancelReason: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
