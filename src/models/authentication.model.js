import mongoose from 'mongoose';

const authenticationSchema = new mongoose.Schema(
  {
    token: {
      required: true,
      type: String,
    },
  },

  {
    timestamps: true,
  },
);

const authentications = mongoose.model('authentications', authenticationSchema);

export default authentications;
