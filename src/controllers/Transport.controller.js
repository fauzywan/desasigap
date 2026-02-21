import mongoose from 'mongoose';
import transport from '../models/transport.model.js';
import ServiceReport from '../models/service.model.js';
import reviewModel from '../models/review.model.js';
import reviewModelCopy from '../models/review.model copy.js';
export const getAllTransportRequest = async (req, res) => {
  const data = await transport.find().sort({ createdAt: -1 });
  res.status(200).json({
    data,
    message: 'Get transport requests successfully',
  });
};
export const getTransportById = async (req, res) => {
  const { id } = req.params;
  const data = await transport.findById(id);
  const proof = await reviewModelCopy.findOne({
    serviceId: id,
    type: 'report',
  });
  const review = await reviewModelCopy.findOne({
    serviceId: id,
    type: 'review',
  });

  return res.status(200).json({
    data,
    proof: proof || null,
    review: review || null,
    message: 'Getting Transport request successfully',
  });
};
export const acceptTransport = async (req, res) => {
  const { id } = req.params;
  const { officerId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid transport ID' });
  }

  const transportation = await transport.findById(id);
  if (!transportation) {
    return res.status(404).json({ message: 'Transport request not found' });
  }

  if (transportation.status !== 'pending') {
    return res.status(400).json({
      message: 'Transport request cannot be accepted',
    });
  }

  transportation.status = 'accepted';
  await transportation.save();

  res.status(200).json({
    message: 'Transport request accepted successfully',
    data: transportation,
  });
};
export const OnTripTransport = async (req, res) => {
  const { id } = req.params;
  const { officerId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid transport ID' });
  }

  const transportation = await transport.findById(id);
  if (!transportation) {
    return res.status(404).json({ message: 'Transport request not found' });
  }

  if (transportation.status !== 'accepted') {
    return res.status(400).json({
      message: 'Transport request cannot be accepted',
    });
  }

  transportation.status = 'on_trip';
  await transportation.save();

  res.status(200).json({
    message: 'Transport request on_trip successfully',
    data: transportation,
  });
};

export const createTransportRequest = async (req, res) => {
  try {
    const {
      transportType,
      pickupLocation,
      destination,
      user,
      phoneNumber,
      pickupTime,
      note,
      peopleTotal,
    } = req.body;

    const data = await transport.create({
      transportType,
      pickupLocation,
      user,
      phoneNumber,
      destination,
      pickupTime,
      note,
      peopleTotal,
    });

    res.status(201).json({
      message: 'Transport request submitted',
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error' + err,
      error: err,
    });
  }
};
export const deleteTransport = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid transport ID' });
  }

  const transport = await transport.findById(id);
  if (!transport) {
    return res.status(404).json({ message: 'Transport request not found' });
  }

  if (!['pending', 'cancelled'].includes(transport.status)) {
    return res.status(400).json({
      message: 'Transport cannot be deleted',
    });
  }

  await transport.deleteOne();

  res.status(200).json({
    message: 'Transport deleted successfully',
  });
};

export const completeTransport = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid transport ID' });
  }

  const transportation = await transport.findById(id);
  if (!transportation) {
    return res.status(404).json({ message: 'Transport request not found' });
  }

  if (!['accepted', 'on_trip'].includes(transportation.status)) {
    return res.status(400).json({
      message: 'Transport cannot be completed',
    });
  }

  transportation.status = 'completed';
  await transportation.save();

  res.status(200).json({
    message: 'Transport completed successfully',
    data: transportation,
  });
};
