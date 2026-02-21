import express from 'express';
import {
  getAllService,
  getServiceWithLimit,
  getActiveService,
  getInActiveService,
  getInActiveWithTypeService,
  getActiveWithTypeService,
  createServiceReport,
  getServiceWithLimitByUser,
  getMyInActiveService,
  getMyActiveService,
} from '../controllers/service.controller.js';
import { uploadReportPhoto } from '../middleware/upload.js';

import authenticateToken from '../middleware/auth.js';
import { createReviewService } from '../controllers/review.controller.js';
const router = express.Router();
router.post(
  '/service-report',
  uploadReportPhoto.array('photo', 5),
  createReviewService,
);
router.get('/', authenticateToken, getAllService);
router.get('/:limit/limit', authenticateToken, getServiceWithLimit);
router.get('/:id/:limit/me', authenticateToken, getServiceWithLimitByUser);
router.get('/:type/active', authenticateToken, getActiveWithTypeService);
router.get('/:type/finish', authenticateToken, getInActiveWithTypeService);
router.get('/active', authenticateToken, getActiveService);
router.get('/finish', authenticateToken, getInActiveService);
router.get('/:id/myFinish', authenticateToken, getMyInActiveService);
router.get('/:id/myActive', authenticateToken, getMyActiveService);

export default router;
