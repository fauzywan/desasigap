import express from 'express';
import {
  acceptTransport,
  completeTransport,
  createTransportRequest,
  deleteTransport,
  getAllTransportRequest,
  getTransportById,
  OnTripTransport,
} from '../controllers/Transport.controller.js';
const router = express.Router();

router.get('/', getAllTransportRequest);
router.get('/:id', getTransportById);

router.post('/', createTransportRequest);
router.put('/:id/accept', acceptTransport);
router.put('/:id/complete', completeTransport);
router.put('/:id/on_trip', OnTripTransport);
router.delete('/:id', deleteTransport);

export default router;
