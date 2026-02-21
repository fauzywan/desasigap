import express from 'express';
import {
  deleteSuggestion,
  getAllSuggestion,
  storeSuggestion,
} from '../controllers/suggestion.contoller.js';
const router = express.Router();

router.get('/', getAllSuggestion);
router.post('/', storeSuggestion);
router.delete('/:id', deleteSuggestion);

export default router;
