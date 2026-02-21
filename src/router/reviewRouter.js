import express from 'express';
import { createReviewService } from '../controllers/review.controller.js';
import { uploadReportPhoto } from '../middleware/upload.js';

const router = express.Router();

router.post('/', uploadReportPhoto.array('photo'), createReviewService);

export default router;
