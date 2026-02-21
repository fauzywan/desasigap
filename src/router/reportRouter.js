import express from 'express';
import {
  getAllReport,
  createReport,
  acceptReport,
  getReportById,
  getMyReport,
  resolveReport,
  rejectReport,
} from '../controllers/report.controller.js';
import { uploadReportPhoto } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllReport);
router.get('/:limit/limit', getAllReport);
router.get('/:id/myReport', getMyReport);
router.get('/:id', getReportById);
router.put('/:id/in_progress', getReportById);
router.put('/:id/resolved', getReportById);
router.post('/', uploadReportPhoto.array('photos', 5), createReport);
router.patch('/:id/accept', acceptReport);

router.put('/:id/accept', acceptReport);
router.put('/:id/complete', resolveReport);
router.put('/:id/reject', rejectReport);

export default router;
