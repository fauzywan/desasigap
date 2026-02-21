import express from 'express';
import {
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
} from '../controllers/faq.controller.js';
import authenticateToken, { admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getFaqs).post(authenticateToken, admin, createFaq);

router
  .route('/:id')
  .put(authenticateToken, admin, updateFaq)
  .delete(authenticateToken, admin, deleteFaq);

export default router;
