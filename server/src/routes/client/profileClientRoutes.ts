import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { getUserProfile, updateUserProfile } from '../../controllers/client/profileClientController';

const router = Router();

router.get('/', authMiddleware, getUserProfile);
router.put('/', authMiddleware, updateUserProfile);

export default router;
