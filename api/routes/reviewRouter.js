import express from 'express';
import { createReview, deleteReview, findReview, updateReview } from '../controllers/ReviewController.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

router.post('/create', requireAuth, createReview);
router.get('/:id', requireAuth, findReview);
router.delete('/delete/:id', requireAuth, deleteReview);
router.patch('/update/:id', requireAuth, updateReview);

export default router;