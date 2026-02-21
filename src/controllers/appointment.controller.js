import mongoose from 'mongoose';
import Appointment from '../models/appointment.model.js';
import appointment from '../models/appointment.model.js';
import { appointmentValidationSchema } from '../validations/appointmentValidator.js';
import ServiceReport from '../models/service.model.js';
import reviewModelCopy from '../models/review.model copy.js';
export const getMyAppointment = async (req, res) => {
  const { id } = req.params;
  const data = await appointment
    .find({ user: id })
    .populate('user', 'name')
    .populate('meetingWith', 'name');

  return res
    .status(200)
    .json({ data: data, message: 'Gettinh Appointments  Succesfully' });
};
export const getAllAppointment = async (req, res) => {
  const data = await appointment.find();
  return res
    .status(200)
    .json({ data: data, message: 'Gettinh Appointments  Succesfully' });
};

export const getAppointmentById = async (req, res) => {
  const { id } = req.params;
  const data = await appointment.findById(id);
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
    message: 'Getting Appointments Successfully',
  });
};
export const storeAppointment = async (req, res) => {
  try {
    const newData = await appointmentValidationSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    const appointmentModel = await appointment.create(req.body);
    return res.status(201).json({
      data: appointmentModel,
      message: 'Janji temu berhasil dibuat',
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error ' + error,
        errors: error.errors,
      });
    }

    console.error(error);
    return res.status(500).json({
      message: 'Internal Server Error' + error,
    });
  }
};

export const approveAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid appointment ID' });
    }

    const appointmentData = await appointment.findById(id);
    if (!appointmentData) {
      return res.status(404).json({ message: 'Appointment tidak ditemukan' });
    }

    appointmentData.status = 'approved';

    await appointmentData.save();

    return res.status(200).json({
      data: appointmentData,
      message: 'Janji temu disetujui',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const approveWithReschedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid appointment ID' });
    }

    if (!date || !time) {
      return res.status(400).json({
        message: 'Tanggal dan waktu wajib diisi',
      });
    }

    const appointmentData = await appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment tidak ditemukan' });
    }

    appointmentData.date = date;
    appointmentData.time = time;
    appointmentData.status = 'approved_with_reschedule';
    appointmentData.rejectionReason = null;

    await appointmentData.save();

    return res.status(200).json({
      data: appointment,
      message: 'Janji temu disetujui dengan perubahan jadwal',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const rejectAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid appointment ID' });
    }

    if (!reason) {
      return res.status(400).json({
        message: 'Alasan penolakan wajib diisi',
      });
    }

    const appointmentData = await appointment.findById(id);
    if (!appointmentData) {
      return res.status(404).json({ message: 'Appointment tidak ditemukan' });
    }

    appointmentData.status = 'rejected';
    appointmentData.rejectionReason = reason;

    await appointmentData.save();

    return res.status(200).json({
      data: appointmentData,
      message: 'Janji temu ditolak',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
export const completeAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid appointment ID' });
    }

    const appointmentData = await appointment.findById(id);
    if (!appointmentData) {
      return res.status(404).json({ message: 'Appointment tidak ditemukan' });
    }

    appointmentData.status = 'completed';

    await appointmentData.save();

    return res.status(200).json({
      data: appointmentData,
      message: 'Janji temu telah diselesaikan',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid appointment ID' });
    }

    if (!reason) {
      return res.status(400).json({
        message: 'Alasan pembatalan wajib diisi',
      });
    }

    const appointmentData = await appointment.findById(id);
    if (!appointmentData) {
      return res.status(404).json({ message: 'Appointment tidak ditemukan' });
    }

    appointmentData.status = 'cancelled';
    appointmentData.cancelReason = reason;

    await appointmentData.save();

    return res.status(200).json({
      data: appointmentData,
      message: 'Janji temu berhasil dibatalkan',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
