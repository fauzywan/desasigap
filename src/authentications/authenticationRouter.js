import express from 'express';
import {
  getAllUser,
  getUserById,
  updateUserByUsername,
} from '../controllers/user.controller.js';
import { login, logout } from './authentication.controller.js';
const router = express.Router();

router.patch('/:username', updateUserByUsername);
router.get('/', login);
router.post('/', login);
router.get('/:id', getUserById);
router.delete('/', logout);
router.get('/', getAllUser);

export default router;
