import express from 'express';
import {
  approveAppointment,
  approveWithReschedule,
  cancelAppointment,
  completeAppointment,
  getAllAppointment,
  rejectAppointment,
  storeAppointment,
  getAppointmentById,
  getMyAppointment,
} from '../controllers/appointment.controller.js';
const router = express.Router();

router.get('/', getAllAppointment);
router.get('/:id', getAppointmentById);
router.get('/:id/myReport', getMyAppointment);
router.post('/', storeAppointment);
router.put('/:id/accept', approveAppointment);
router.put('/:id/approve-reschedule', approveWithReschedule);
router.put('/:id/reject', rejectAppointment);
router.put('/:id/complete', completeAppointment);
router.put('/:id/cancel', cancelAppointment);

export default router;
