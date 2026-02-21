import express from 'express';
import { getPrintByDate } from '../controllers/print.controller.js';
import authenticateToken from '../middleware/auth.js';
authenticateToken;
const router = express.Router();

router.get('/:start/:end', authenticateToken, getPrintByDate);
router.post('/:start/:end', authenticateToken, getPrintByDate);

export default router;
