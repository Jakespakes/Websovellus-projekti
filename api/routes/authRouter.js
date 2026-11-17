import express from 'express';
import {register, login, getProfile, logout, updateProfile, changePassword} from '../controllers/AuthController.js';
import requireAuth from '../middleware/requireAuth.js';
import requireAdmin from '../middleware/requireAdmin.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', requireAuth, logout);
router.get('/profile', requireAuth, getProfile);
router.patch('/profile', requireAuth, updateProfile)
router.patch('/change-password', requireAuth, changePassword)
//router.delete('/users/:id', requireAuth, requireAdmin, deleteUser);

export default router;