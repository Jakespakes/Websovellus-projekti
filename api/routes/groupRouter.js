import express from 'express';
import { createGroup, getUserGroups, getOwnedGroups, deleteGroup } from '../controllers/GroupController.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

// Reitit ryhmätoimintoihin, vaatii autentikoinnin
router.post('/', requireAuth, createGroup);
router.get('/my-groups', requireAuth, getUserGroups);
router.get('/owned-groups', requireAuth, getOwnedGroups);
router.delete('/:id', requireAuth, deleteGroup);

export default router;