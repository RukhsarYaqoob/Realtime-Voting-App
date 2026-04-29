import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
  updateUser,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (require authentication)
router.get('/me', protect, getMe);
router.put('/update', protect, updateUser);

export default router;