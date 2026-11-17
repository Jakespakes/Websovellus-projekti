import express from 'express';
import { createReview, deleteReview, findReview } from '../controllers/ReviewController.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

router.post('/create', requireAuth, createReview);
router.get('/:id', requireAuth, findReview);
router.delete('/delete/:id', requireAuth, deleteReview);

export default router;