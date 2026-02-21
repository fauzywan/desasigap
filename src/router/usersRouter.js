import express from 'express';
const router = express.Router();
import {
  getAllUser,
  register,
  getyserByName,
  deleteUserById,
  updateUserByUsername,
  getUserById,
  registerAdmin,
  updatePassword,
  update,
  getOfficer,
} from '../controllers/user.controller.js';

router.patch('/:username', updateUserByUsername);
router.post('/admin/add', registerAdmin);
router.post('/', register);
router.get('/officer/role', getOfficer);
router.put('/:id', update);
router.put('/:id/password', updatePassword);
router.get('/:id', getUserById);
router.delete('/:username', deleteUserById);
router.get('/', getAllUser);

export default router;
