import express from 'express';
import { adminLogin, adminRefreshToken, adminLogout } from '../../controllers/admin/authAdminController';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = express.Router();

router.post('/login', adminLogin);
router.post('/refresh', adminRefreshToken);
router.post('/logout', authMiddleware, adminLogout);

export default router;
